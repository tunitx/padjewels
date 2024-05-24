import { Navigate, useNavigate } from "react-router-dom"
import img from '../../assets/theweddingcorp_1200x1200.webp'

const ShopBanner = () => {
    const navigate = useNavigate();
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center  gap-14">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
    <img className="object-cover object-center rounded" alt="hero" src={img} style={{width: '80%', height: 'auto'}} />
</div>
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center  text-right">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">We are Pad Jewels,
                    </h1>
                    <p className="mb-8 leading-relaxed">We believe that jewelry is more than adornment; it's a way to tell your story without a single word. Shop now with us!</p>
                    <div className="flex justify-center ">
                        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => navigate('/shop-list-standard')}>Explore Now</button>

                    </div>
                </div>
            </div>
        </section>

    )
}
export default ShopBanner