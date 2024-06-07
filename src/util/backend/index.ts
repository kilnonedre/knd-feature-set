import { NextResponse } from 'next/server'

export const response = (
  status: number,
  code: number,
  data: any,
  msg: string = 'success'
) => NextResponse.json({ code, data, msg }, { status })

export const dataNow = () => Math.round(Number(new Date()) / 1000)
