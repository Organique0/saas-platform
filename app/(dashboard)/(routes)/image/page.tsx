"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Heading } from "@/components/Heading";
import { useForm } from "react-hook-form";
import { LuDownload, LuImage, LuMessageSquare } from "react-icons/lu";
import { RxDoubleArrowRight } from "react-icons/rx";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import BotAvatar from "@/components/BotAvatar";
import { UserAvatar } from "@/components/userAvatar";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/view-pro-modal";

const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const proModal = useProModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await axios.post("/api/image", values);
            const urls = response.data.map((image: { url: string }) => image.url);

            setImages(urls);
            form.reset();

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            }
        } finally {
            router.refresh();
        }
    }
    return (
        <div>
            <Heading
                title="Image generation"
                description="Create images using a text prompt"
                icon={LuImage}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg w-full p-2 grid grid-cols-12 gap-2 border">
                            <FormField name="Prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-7">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 focus-visible:ring-0 focus-visible:ring-transparent shadow-none"
                                            disabled={isLoading}
                                            placeholder="What image do you need?"
                                            {...field}
                                            {...form.register('prompt')}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <FormField name="amount" control={form.control} render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}

                            />
                            <FormField name="resolution" control={form.control} render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}

                            />
                            <Button className="col-span-12 lg:col-span-1 aspect-square ml-auto" disabled={isLoading}>
                                <RxDoubleArrowRight size="23" />
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="">
                    {isLoading && (
                        <div className="w-full flex items-center justify-center">
                            <Loader color="#ec4899" />
                            This may take a while
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label="No images" />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((url) => (
                            <Card key={url} className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image alt="image" fill src={url} />
                                </div>
                                <CardFooter className="p-2">
                                    <Button onClick={() => window.open(url)} variant="secondary" className="w-full">
                                        <LuDownload className="h-4 w-4 mr-2" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ImagePage;