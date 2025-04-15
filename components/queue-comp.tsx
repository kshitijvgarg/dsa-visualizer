"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';
import { Queue } from '@/lib/models/queue'
import React, { useState } from 'react'

const queue = new Queue<string>(5);

function QueueComp() {

    const [queueUi, setQueueUi] = useState<string[]>(queue.getQueue());
    const [valToEnqueue, setValToEnqueue] = useState<string>('');

    const handleEnqueue = () => {
        if (valToEnqueue) {
            if (queue.enqueue(valToEnqueue)) {
                setQueueUi([...queue.getQueue()]);
            }
            else {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh!',
                    description: 'Overflow. Queue is full.'
                })
            }
        }
        else {
            toast({
                variant: 'destructive',
                title: 'Uh oh!',
                description: 'Input cannot be empty.'
            })
        }
        setValToEnqueue('');
    }

    const handleDequeue = () => {
        if (queue.dequeue()) {
            setQueueUi([...queue.getQueue()]);
        }
        else {
            toast({
                variant: 'destructive',
                title: 'Uh oh!',
                description: 'Underflow. Queue is empty.'
            })
        }
    }

    return (
        <>
            <div className='flex gap-2'>
                <Input value={valToEnqueue} onChange={(e) => setValToEnqueue(e.target.value)}></Input>
                <Button onClick={() => handleEnqueue()}>Enqueue</Button>
                <Button onClick={() => handleDequeue()}>Dequeue</Button>
            </div>
            <div className='mt-10 flex gap-4 border-border border-2 w-60 h-10'>
                {queueUi?.map((val, index) => (
                    <Button key={index} variant='outline' disabled size='icon'>{val}</Button>
                ))}

                {/* <Button variant='outline' disabled size='icon'>{queueUi[1]}</Button>
                <Button variant='outline' disabled size='icon'>{queueUi[2]}</Button>
                <Button variant='outline' disabled size='icon'>{queueUi[3]}</Button>
                <Button variant='outline' disabled size='icon'>{queueUi[4]}</Button> */}
            </div>
            <Toaster />
        </>
    )
}

export default QueueComp