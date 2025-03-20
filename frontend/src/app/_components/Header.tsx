import React from 'react'

export default function Header({ title }: { title: string }) {
    return (
        <h1 className='text-3xl font-bold font-mono'>{title}</h1>
    )
}
