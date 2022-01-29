import Greeting from "../components/Greeting";
import Layout from "../components/Layout";
import Statistics from "../components/Statistics";
import TopEmployee from "../components/TopEmployee";
import nookies from 'nookies';
import axios from 'axios';

export default function test() {
    const cookies = nookies.get()
    const token = cookies.token

    axios.get(`${process.env.NEXT_PUBLIC_URL}/api/projects`, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })

    return (
        <Layout title="Test">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione quia corrupti soluta animi, ipsum voluptates pariatur voluptatibus quisquam distinctio repudiandae!
        </Layout>
    )
}