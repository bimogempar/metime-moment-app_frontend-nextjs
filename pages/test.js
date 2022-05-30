import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

export default function Test() {

    const handleChangeFile = (e) => {
        console.log(e.target.files[0])
        const img = e.target.files[0]
        const fD = new FormData()
        fD.append('img', img)
        console.log(fD);
        axios.post('http://127.0.0.1:8000/api/upload-file', fD)
            .then(res => {
                console.log(res)
            })
    }

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

    const formikFile = useFormik({
        initialValues: {
            title: '',
            img: ''
        },
        validationSchema: Yup.object({
            img: Yup.mixed()
                .nullable()
                .notRequired()
                .test("FILE_SIZE", "Uploaded file is too big.",
                    value => !value || (value && value.size <= 2000))
                .test("FILE_FORMAT", "Uploaded file has unsupported format.",
                    value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
        }),
        onSubmit: (values) => {
            console.log(values.img)
            const img = values.img
            const fD = new FormData()
            fD.append('img', img)
            fD.append('title', values.title)
            axios.post('http://127.0.0.1:8000/api/upload-file', fD)
                .then(res => {
                    console.log(res)
                })
        }
    })

    console.log(formikFile.errors)

    return (
        <div>
            <form onSubmit={formikFile.handleSubmit}>
                <input type="text" name="title" id="title" onChange={formikFile.handleChange} value={formikFile.values.title} />
                <input type="file" onChange={(e) => formikFile.setFieldValue('img', e.target.files[0])} />
                <input type="file" onChange={(e) => handleChangeFile(e)} />
                <button type='submit'>Submit</button>
            </form>
        </div >
    )
}
