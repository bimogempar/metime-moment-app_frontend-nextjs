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

    return (
        <Layout title="Human Resource">
            <div className="mb-5">
                <h1 className="mb-5 text-2xl font-extralight">Employee</h1>
                <div className="grid grid-cols-1 gap-5 bg-white p-5 rounded-xl">
                    <div className="flex gap-x-3 justify-between align-items-center">
                        <div className="flex bg-gray-100 p-2 w-2/5 space-x-4 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input className="bg-gray-100 outline-none" type="text" placeholder="Search" onKeyUp={e => console.log(e.target.value)} />
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Name</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Email</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Spent</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Country</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    <tr>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" alt="Alex Shatov" width={40} height={40} /></div>
                                                <div className="font-medium text-gray-800">Alex Shatov</div>
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">alexshatov@gmail.com</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left font-medium text-green-500">$2,890.66</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center">🇺🇸</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}