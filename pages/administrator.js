import Layout from '../components/Layout';
import Employee from '../components/Administrator/Employee';
import Package from '../components/Administrator/Package';

export default function Administrator(props) {
    return (
        <Layout title="Administrator">
            <div className="">
                <h1 className="mb-5 text-2xl font-extralight">Employee</h1>
                <Employee />
                <h1 className="my-5 text-2xl font-extralight">Package</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    <Package />
                    <Package />
                    <Package />
                    <Package />
                    <Package />
                </div>
            </div>
        </Layout >
    )
}