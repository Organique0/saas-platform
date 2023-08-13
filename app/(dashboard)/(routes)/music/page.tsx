"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Heading } from "@/components/Heading";
import { useForm } from "react-hook-form";
import { LuMusic } from "react-icons/lu";
import { RxDoubleArrowRight } from "react-icons/rx";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import Loader from "@/components/Loader";

const MusicPage = () => {
    const [music, setMusic] = useState<string>();
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
            setMusic(undefined);
            setMessage(form.getValues("prompt"));
            const response = await axios.post("/api/music", values);
            setMusic(response.data.audio);
            form.reset();

        } catch (error: any) {
            //console.log(error);
        } finally {

        }
    }
    return (
        <div>
            <Heading
                title="Music generation"
                description="Create music using AI"
                icon={LuMusic}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
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
                        <div className="w-full pt-10 text-2xl font-bold uppercase text-center">
                            {message}
                        </div>
                    )}

                    {isLoading && (
                        <div className="w-full flex items-center justify-center">
                            <Loader color="#10b981" />
                            This may take a while.
                        </div>
                    )}
                    {!music && !isLoading && (
                        <Empty label="No music generated" />
                    )}
                    {music && (
                        <audio controls className="w-full mt-8">
                            <source src={music} />
                        </audio>
                    )}
                </div>
            </div>
        </div >
    );
}

export default MusicPage;