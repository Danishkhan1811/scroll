import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import UpgradeButton from '@/components/UpgradeButton'
import { buttonVariants } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { PLANS } from '@/config/stripe'
import { cn } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
    ArrowRight,
    Check,
    HelpCircle,
    X
} from 'lucide-react'
import Link from 'next/link'

const Page = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const pricingItems = [
        {
            plan: 'Free',
            tagline: 'For small side projects.',
            quota: 10,
            features: [
                {
                    text: '5 pages per PDF',
                    footnote: 'The maximum amount of pages per PDF-file.',
                },
                {
                    text: '4MB file size limit',
                    footnote: 'The maximum file size of a single PDF file.',
                },
                {
                    text: 'Mobile-friendly interface',
                },
                {
                    text: 'Higher-quality responses',
                    footnote: 'Better algorithmic responses for enhanced content quality',
                    negative: true,
                },
                {
                    text: 'Priority support',
                    negative: true,
                },
            ],
        },
        {
            plan: 'Pro',
            tagline: 'For larger projects with higher needs.',
            quota: PLANS.find((p) => p.slug === 'pro')!.quota,
            features: [
                {
                    text: '25 pages per PDF',
                    footnote: 'The maximum amount of pages per PDF-file.',
                },
                {
                    text: '16MB file size limit',
                    footnote: 'The maximum file size of a single PDF file.',
                },
                {
                    text: 'Mobile-friendly interface',
                },
                {
                    text: 'Higher-quality responses',
                    footnote: 'Better algorithmic responses for enhanced content quality',
                },
                {
                    text: 'Priority support',
                },
            ],
        },
    ]

    return (
        <>
            <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl">
                <div className="mx-auto mb-10 sm:max-w-lg">
                    <h1 className="text-6xl p-5 font-bold sm:text-7xl text-white">
                        Pricing
                    </h1>
                    <p className="mt-5 text-white sm:text-lg">
                        Whether you&apos;re just trying out our service
                        or need more, we&apos;ve got you covered.
                    </p>
                </div>

                <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
                    <TooltipProvider>
                        {pricingItems.map(({ plan, tagline, quota, features }) => {
                            const price = PLANS.find(
                                (p) => p.slug === plan.toLowerCase()
                            )?.price.amount || 0

                            return <div key={plan} className={cn('relative rounded-2xl bg-indigo-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 transition hover:shadow-lg shadow-lg', {
                                'border-4 border-teal-500 shadow-teal-200': plan === "Pro",
                                'border border-gray-200': plan !== "Pro"
                            }
                            )}>
                                {plan === "pro" && (
                                    <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 px-3 py-2 text-sm font-medium text-white">
                                        Upgrade Now
                                    </div>
                                )}

                                <div className='p-5'>
                                    <h3 className='my-3 text-center font-display text-3xl  text-white font-bold'>
                                        {plan}
                                    </h3>
                                    <p className='text-white'>
                                        {tagline}
                                    </p>
                                    <p className='my-5 font-display text-white text-6xl font-semibold'>
                                        ${price}
                                    </p>
                                    <p className='text-white'>
                                        per month
                                    </p>
                                </div>

                                <div className='flex h-20 text-white items-center justify-center border-b border-t border-gray-200 bg-[#241f54]'>
                                    <div className='flex items-center space-x-1'>
                                        <p>
                                            {quota.toLocaleString()} PDFs/mo
                                            included
                                        </p>

                                        <Tooltip delayDuration={300}>
                                            <TooltipTrigger className='cursor-default ml-1.5'>
                                                <HelpCircle className='h-4 w-4 text-white' />
                                            </TooltipTrigger>
                                            <TooltipContent className='w-80 p-2'>
                                                How many PDFs you can upload per
                                                month.
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>

                                <ul className='my-10 space-y-5 px-8'>
                                    {features.map(
                                        ({ text, footnote, negative }) => (
                                            <li
                                                key={text}
                                                className='flex space-x-5'>
                                                <div className='flex-shrink-0'>
                                                    {negative ? (
                                                        <X className='h-6 w-6 text-red-500' />
                                                    ) : (
                                                        <Check className='h-6 w-6 text-green-500' />
                                                    )}
                                                </div>
                                                {footnote ? (
                                                    <div className='flex items-center space-x-1'>
                                                        <p
                                                            className={cn(
                                                                'text-white',
                                                                {
                                                                    'text-white':
                                                                        negative,
                                                                }
                                                            )}>
                                                            {text}
                                                        </p>
                                                        <Tooltip
                                                            delayDuration={300}>
                                                            <TooltipTrigger className='cursor-default ml-1.5'>
                                                                <HelpCircle className='h-4 w-4 text-white' />
                                                            </TooltipTrigger>
                                                            <TooltipContent className='w-80 p-2'>
                                                                {footnote}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                ) : (
                                                    <p
                                                        className={cn(
                                                            'text-white',
                                                            {
                                                                'text-white':
                                                                    negative,
                                                            }
                                                        )}>
                                                        {text}
                                                    </p>
                                                )}
                                            </li>
                                        )
                                    )}
                                </ul>
                                <div className='border-t border-gray-200' />
                                <div className='p-5'>
                                    {plan === 'Free' ? (
                                        <Link
                                            href={user ? '/dashboard' : '/sign-up'}
                                            className={buttonVariants({
                                                className: 'w-full',
                                                variant: 'secondary',
                                            })}>
                                            {user ? 'Upgrade now' : 'Sign up'}
                                            <ArrowRight className='h-5 w-5 ml-1.5' />
                                        </Link>
                                    ) : user ? (
                                        <UpgradeButton />
                                    ) : (
                                        <Link
                                            href='/sign-up'
                                            className={buttonVariants({
                                                className: 'w-full',
                                            })}>
                                            {user ? 'Upgrade now' : 'Sign up'}
                                            <ArrowRight className='h-5 w-5 ml-1.5' />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        }
                        )}
                    </TooltipProvider>
                </div>
            </MaxWidthWrapper>
        </>
    )
}

export default Page