"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Heading } from "@/components/Heading";
import { useForm } from "react-hook-form";
import { LuCode, LuMessageSquare } from "react-icons/lu";
import { RxDoubleArrowRight } from "react-icons/rx";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { Empty } from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import BotAvatar from "@/components/BotAvatar";
import { UserAvatar } from "@/components/userAvatar";
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/view-pro-modal";
import toast from "react-hot-toast";

const CodePage = () => {
    const router = useRouter();
    const proModal = useProModal();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/code", { messages: newMessages });
            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Somethign went wrong")
            }
        } finally {

        }
    }
    return (
        <div>
            <Heading
                title="Code generation"
                description="Generate code using text"
                icon={LuCode}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg w-full p-2 grid grid-cols-12 gap-2 border mb-4">
                            <FormField name="Prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-11">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 focus-visible:ring-0 focus-visible:ring-transparent shadow-none"
                                            disabled={isLoading}
                                            placeholder="What code do you need?"
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
                    {isLoading && (
                        <div className="w-full flex items-center justify-center">
                            <Loader color="#8b5cf6" />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No convesations" />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.content + "" + Math.random()}
                                className={cn(
                                    `p-8 
                                    w-full 
                                    flex 
                                    items-start 
                                    gap-x-8 
                                    rounded-lg

                                    `,
                                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted")
                                }
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <ReactMarkdown components={{
                                    pre: ({ node, ...props }) => (
                                        <div className="w-full my-2 bg-black/10 overflow-auto p-2 rounded-lg">
                                            <pre {...props} />
                                        </div>
                                    ),
                                    code: ({ node, ...props }) => (
                                        <code className="bg-black/10 rounded-lg p-1" {...props} />
                                    )
                                }}
                                    className="overflow-hidden leading-7 text-sm"
                                >
                                    {message.content || ""}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CodePage;