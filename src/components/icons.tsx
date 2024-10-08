import { LucideProps, User } from 'lucide-react'

export const Icons = {
    user: User,
    logo: (props: LucideProps) => (
        // <svg {...props} viewBox='0 0 24 24'>
        //     <path d='m6.94 14.036c-.233.624-.43 1.2-.606 1.783.96-.697 2.101-1.139 3.418-1.304 2.513-.314 4.746-1.973 5.876-4.058l-1.456-1.455 1.413-1.415 1-1.001c.43-.43.915-1.224 1.428-2.368-5.593.867-9.018 4.292-11.074 9.818zm10.06-5.035 1 .999c-1 3-4 6-8 6.5-2.669.334-4.336 2.167-5.002 5.5h-1.998c1-6 3-20 18-20-1 2.997-1.998 4.996-2.997 5.997z' />
        // </svg>

        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17.5" cy="17.5" r="17.5" fill="#101010" />
            <path d="M11.6083 12C13.1709 15.0194 28.3561 16.4103 24.3201 23C23.6205 19.6802 7.73212 18.7749 11.6083 12Z" fill="white" stroke="white" />
            <path d="M25.7626 8.54368L25.7493 13.8915L21.1313 11.2178L25.7626 8.54368Z" fill="white" />
            <path d="M10.6726 25.8934L10.6638 20.5455L15.2928 23.2002L10.6726 25.8934Z" fill="white" />
        </svg>


    )
};
