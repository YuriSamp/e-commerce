import Link from 'next/link';

interface Props {
    value: string;
    type?: string;
    href?: string | number;
}


const Button = (props: Props) => {
    if (props.type === 'LINK') {
        return (
            <Link
                href={`/produtos/${props.href}`}
                className='text-lg p-2  mx-auto radius-5 ring-2 my-[1rem] ring-backgroundPink font-kalam rounded-lg select-none'>
                {props.value}
            </Link>
        )
    }
    return (
        <button className='text-lg p-2  mx-auto radius-5 ring-2 my-[1rem] ring-backgroundPink font-kalam rounded-lg select-none'>
            {props.value}
        </button>
    )

}

export default Button