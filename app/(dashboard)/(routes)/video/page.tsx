"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Heading } from "@/components/Heading";
import { useForm } from "react-hook-form";
import { LuMusic, LuVideo } from "react-icons/lu";
import { RxDoubleArrowRight } from "react-icons/rx";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

const VideoPage = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>();
    const [message, setMessage] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);
            setMessage(form.getValues("prompt"));
            const response = await axios.post("/api/video", values);
            setVideo(response.data[0]);
            form.reset();

        } catch (error: any) {
            //console.log(error);
        } finally {
            router.refresh();
        }
    }
    return (
        <div>
            <Heading
                title="Video generation"
                description="Create videos using AI"
                icon={LuVideo}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg w-full p-2 grid grid-cols-12 gap-2 border">
                            <FormField name="Prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-11">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 focus-visible:ring-0 focus-visible:ring-transparent shadow-none"
                                            disabled={isLoading}
                                            placeholder="Enter a prompt"
                                            {...field}
                                            {...form.register('prompt')}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button className="col-span-12 lg:col-span-1 aspect-square ml-auto" disabled={isLoading}>
                                <RxDoubleArrowRight size="23" />
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="">
                    {message && !isLoading && (
                        <div className="w-full p-2 rounded-md text-2xl uppercase text-center mt-5">
                            {message}
                        </div>
                    )}

                    {isLoading && (
                        <div className="w-full flex items-center justify-center">
                            <Loader color="#f97316" />
                            This may take a while
                        </div>
                    )}
                    {!video && !isLoading && (
                        <Empty label="No video generated" />
                    )}
                    {video && (
                        <div className="w-full flex justify-center items-center">
                            <video controls className="w-[50%] aspect-video mt-8 rounded-lg border bg-black">
                                <source src={video} />
                            </video>
                        </div>

                    )}
                </div>
            </div>
        </div >
    );
}

export default VideoPage;