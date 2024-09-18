"use client"

import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react"
import Link from "next/link"
import UploadButton from "./UploadButton"
import { trpc } from "@/app/_trpc/client"
import Skeleton from "react-loading-skeleton"
import { format } from "date-fns"
import { Button } from "./ui/button"
import { useState } from "react"

const Dashboard = () => {

    const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(
        null
    )

    const utils = trpc.useUtils()

    const { data: files, isLoading } =
        trpc.getUserFiles.useQuery()

    const { mutate: deleteFile } =
        trpc.deleteFile.useMutation({
            onSuccess: () => {
                utils.getUserFiles.invalidate()
            },
            onMutate({ id }) {
                setCurrentlyDeletingFile(id)
            },
            onSettled() {
                setCurrentlyDeletingFile(null)
            }
        })

    return (
        <main className="mx-auto container max-w-7xl md:p-10">
            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
                <h1 className="mb-3 font-bold text-5xl text-white">
                    My Files
                </h1>

                <UploadButton />
            </div>

            {/* display all files of the user*/}
            {files && files?.length !== 0 ? (
                <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
                    {files.sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    ).map((file) => (
                        <li
                            key={file.id}
                            className="cursor-pointer col-span-1 divide-y divide-[#494964] bg-indigo-200 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 shadow transition hover:shadow-lg">
                            <Link href={`/dashboard/${file.id}`}>
                                <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-[#3A5BE7] to-[#03DACD]"></div>
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="truncate text-lg font-medium text-white">
                                                {file.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-white">
                                <div className="flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    {format(new Date(file.createdAt), "MMM yyyy")}
                                </div>

                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    mocked
                                </div>

                                <Button
                                    onClick={() =>
                                        deleteFile({ id: file.id })
                                    }
                                    size='sm'
                                    className="w-full bg-red-500  text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                    {currentlyDeletingFile === file.id ? (
                                        <Loader2 className='h-4 w-4 animate-spin'/>
                                    ) : <Trash className="h-4 w-4" />}
                                </Button>
                            </div>

                        </li>
                    ))}
                </ul>
            ) : isLoading ? (
                <Skeleton height={100} className="my-2" count={3} />
            ) : (
                <div className="mt-16 flex flex-col items-center gap-2 text-white">
                    <Ghost className="h-8 w-8" />
                    <h3 className="font-semibold text-xl">Pretty empty around here...</h3>
                    <p>Let&apos;s upload your first PDF</p>
                </div>
            )}
        </main>
    )
}

export default Dashboard