import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { getKindeServerSession, LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'

const Navbar = async () => {

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <nav className='sticky h-14 inset-x-2 top-0 z-30 w-full backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex container h-14 items-center justify-between '>
          <Link
            href='/'
            className='flex z-40 font-semibold text-white text-[24px]'>
            <span>Scroll</span>
          </Link>
          <div className='hidden items-center space-x-4 sm:flex text-white'>
            {!user ? <>
              <Link href='/pricing'
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm'
                })}>
                Pricing
              </Link>
              <LoginLink
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm'
                })}>
                Sign in
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  size: 'sm',
                })} style={{ background: 'linear-gradient(to right, #3A5BE7, #04C6B9)' }}>
                Get started <ArrowRight className='ml-1.5 h-5 2-5'></ArrowRight>
              </RegisterLink>
            </> : <>
              <Link href='/dashboard'
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm'
                })}>
                Dashboard
              </Link>
              <UserAccountNav name={
                !user.given_name || !user.family_name
                  ? 'Your Account'
                  : `${user.given_name} ${user.family_name}`
              }
                email={user.email ?? ''}
                imageUrl={user.picture ?? ''}
              />
            </>}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar