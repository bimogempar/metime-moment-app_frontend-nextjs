import Greeting from "../components/Greeting";
import Layout from "../components/Layout";
import Statistics from "../components/Statistics";
import TopEmployee from "../components/TopEmployee";

export default function test() {
    return (
        <Layout title="Test">
            <Greeting />

            <Statistics />

            <TopEmployee />

            <h1 className="my-5 text-2xl font-extralight">Latest Projects</h1>
            <div className="grid grid-cols-12 gap-5">
                {/* Projects */}
                <div className="bg-white xl:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-5 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem necessitatibus quaerat sit! Nulla, magni tempora. Dolorum corrupti eius magnam rerum illo. Excepturi odio sapiente quam, eveniet labore inventore est nesciunt vitae obcaecati magnam voluptatum minus itaque placeat aspernatur ullam enim voluptatem voluptates sequi illum sit quos. Cupiditate tenetur sapiente architecto magni a? Voluptate enim aliquam amet a at sit tempora, voluptates quas ipsum dolor, labore magni laboriosam neque obcaecati accusamus impedit? Perspiciatis ipsam ipsum expedita cum id iusto. Molestiae delectus similique doloribus dicta atque cum sed deserunt enim explicabo nulla velit repudiandae consequatur, sapiente autem vitae minima nihil? Eius dolore, debitis expedita facere explicabo ullam reiciendis provident facilis maiores enim harum illum officiis repellendus! Quod asperiores obcaecati quidem aperiam consequuntur officia delectus reiciendis error quasi labore, nemo quaerat dolore at quia quisquam corporis sapiente sequi unde, eligendi dolorem ea! Ipsum aliquam quidem, est sunt soluta fugit impedit modi? Eos, esse. Suscipit, iste distinctio ut voluptates adipisci nobis optio eaque sapiente beatae libero nesciunt aliquid dolor reprehenderit consequatur natus nam repellat laborum nostrum fugit qui possimus dolores esse doloribus error. Debitis laboriosam atque culpa, assumenda dolorum iusto rerum! Iste possimus vero perferendis nam optio numquam, dolor molestias placeat ipsum neque excepturi.
                </div>
                <div className="bg-white xl:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-5 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem necessitatibus quaerat sit! Nulla, magni tempora. Dolorum corrupti eius magnam rerum illo. Excepturi odio sapiente quam, eveniet labore inventore est nesciunt vitae obcaecati magnam voluptatum minus itaque placeat aspernatur ullam enim voluptatem voluptates sequi illum sit quos. Cupiditate tenetur sapiente architecto magni a? Voluptate enim aliquam amet a at sit tempora, voluptates quas ipsum dolor, labore magni laboriosam neque obcaecati accusamus impedit? Perspiciatis ipsam ipsum expedita cum id iusto. Molestiae delectus similique doloribus dicta atque cum sed deserunt enim explicabo nulla velit repudiandae consequatur, sapiente autem vitae minima nihil? Eius dolore, debitis expedita facere explicabo ullam reiciendis provident facilis maiores enim harum illum officiis repellendus! Quod asperiores obcaecati quidem aperiam consequuntur officia delectus reiciendis error quasi labore, nemo quaerat dolore at quia quisquam corporis sapiente sequi unde, eligendi dolorem ea! Ipsum aliquam quidem, est sunt soluta fugit impedit modi? Eos, esse. Suscipit, iste distinctio ut voluptates adipisci nobis optio eaque sapiente beatae libero nesciunt aliquid dolor reprehenderit consequatur natus nam repellat laborum nostrum fugit qui possimus dolores esse doloribus error. Debitis laboriosam atque culpa, assumenda dolorum iusto rerum! Iste possimus vero perferendis nam optio numquam, dolor molestias placeat ipsum neque excepturi.
                </div>
                <div className="bg-white xl:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-5 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem necessitatibus quaerat sit! Nulla, magni tempora. Dolorum corrupti eius magnam rerum illo. Excepturi odio sapiente quam, eveniet labore inventore est nesciunt vitae obcaecati magnam voluptatum minus itaque placeat aspernatur ullam enim voluptatem voluptates sequi illum sit quos. Cupiditate tenetur sapiente architecto magni a? Voluptate enim aliquam amet a at sit tempora, voluptates quas ipsum dolor, labore magni laboriosam neque obcaecati accusamus impedit? Perspiciatis ipsam ipsum expedita cum id iusto. Molestiae delectus similique doloribus dicta atque cum sed deserunt enim explicabo nulla velit repudiandae consequatur, sapiente autem vitae minima nihil? Eius dolore, debitis expedita facere explicabo ullam reiciendis provident facilis maiores enim harum illum officiis repellendus! Quod asperiores obcaecati quidem aperiam consequuntur officia delectus reiciendis error quasi labore, nemo quaerat dolore at quia quisquam corporis sapiente sequi unde, eligendi dolorem ea! Ipsum aliquam quidem, est sunt soluta fugit impedit modi? Eos, esse. Suscipit, iste distinctio ut voluptates adipisci nobis optio eaque sapiente beatae libero nesciunt aliquid dolor reprehenderit consequatur natus nam repellat laborum nostrum fugit qui possimus dolores esse doloribus error. Debitis laboriosam atque culpa, assumenda dolorum iusto rerum! Iste possimus vero perferendis nam optio numquam, dolor molestias placeat ipsum neque excepturi.
                </div>
            </div>
        </Layout>
    )
}