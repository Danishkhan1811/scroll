"use client"

import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import ChatInput from "./ChatInput"
import Messages from "./Messages"
import  {ChatContextProvider} from "./ChatContext";
import { trpc } from "@/app/_trpc/client"
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface ChatWrapperProps {
    fileId: string;
}

const ChatWrapper = ({ fileId }: ChatWrapperProps) => {

    const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
        {
            fileId,
        },
        {
            refetchInterval: (query) =>
                query.state.data?.status === "SUCCESS" ||
                    query.state.data?.status === "FAILED"
                    ? false
                    : 500
        }
    );

    if (isLoading) return (
        <div className="relative min-h-full bg-[#030023] flex divide-y divide-zinc-200 flex-col justify-between gap-2">
            <div className="flex-1 flex justify-center items-center flex-col mb-28">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 text-teal-400 animate-spin" />
                    <h3 className="font-semibold text-xl">Loading...</h3>
                    <p className="text-white text-sm">
                        We&apos;re preparing your PDF.
                    </p>
                </div>
            </div>

            <ChatInput isDisabled />
        </div>
    )

    if (data?.status === "PROCESSING") return (
        <div className="relative min-h-full bg-[#030023] flex divide-y divide-zinc-200 flex-col justify-between gap-2">
            <div className="flex-1 flex justify-center items-center flex-col mb-28">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 text-teal-400 animate-spin" />
                    <h3 className="font-semibold text-xl">Processing PDF...</h3>
                    <p className="text-white text-sm">
                        This won&apos;t take long.
                    </p>
                </div>
            </div>

            <ChatInput isDisabled />
        </div>
    )

    if (data?.status === "FAILED") return (
        <div className="relative min-h-full bg-[#030023] flex divide-y divide-zinc-200 flex-col justify-between gap-2">
            <div className="flex-1 flex justify-center items-center flex-col mb-28">
                <div className="flex flex-col items-center gap-2">
                    <XCircle className="h-8 w-8 text-red-500" />
                    <h3 className="font-semibold text-xl">Too many pages in this PDF...</h3>
                    <p className="text-white text-sm">
                        Your <span className="font-medium">Free</span> plan supports upto 5 pages per PDF.
                    </p>
                    <Link href='/dashboard' className={buttonVariants({ variant: "secondary", className: "mt-4" })}><ChevronLeft className="h-3 w-3 mr-1.5" /> Back</Link>
                </div>
            </div>

            <ChatInput isDisabled />
        </div>
    )

    return (
        <ChatContextProvider fileId={fileId}>
            <div className="relative min-h-full bg-[#030023] border-[#413f3f] flex divide-y divide-zinc-200 flex-col justify-between gap-2">
                <div className="flex-1 justify-between flex flex-col mb-28">
                    <Messages fileId={fileId}/>
                </div>

                <ChatInput />
            </div>
        </ChatContextProvider>
    )
}

export default ChatWrapper