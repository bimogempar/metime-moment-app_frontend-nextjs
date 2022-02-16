import Layout from '../components/Layout';
import { useFormik } from 'formik';

export default function Employee(props) {
    const formik = useFormik({
        // initial values
        initialValues: {
            name: '',
        },

        // validation schema
        // validationSchema: Yup.object({})

        // handel submission
        onSubmit: values => {
            console.log(values)
        }
    })
    console.log(formik)
    return (
        <Layout>
            <div className="mb-5">
                <h1 className="mb-5 text-2xl font-extralight">Employee</h1>
                <div className="grid grid-cols-1 gap-5 bg-white p-5 rounded-xl">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                            <label className="font-light text-sm text-gray-600 mb-3 block">Nama</label>
                            <input
                                type="text"
                                className="border rounded-lg px-2 py-2 w-full md:w-6/12"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <button type="submit" className="w-2/12 bg-blue-500 text-white rounded-md p-2">Create</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}