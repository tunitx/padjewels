import { Navigate, useNavigate } from "react-router-dom"
import img from '../../assets/istockphoto-1276740597-612x612.jpeg'
const AboutBanner = () => {
    const navigate = useNavigate();
    return (
<section className="text-gray-600 body-font">
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Exquisite Jewels for Every Occasion
               </h1>
            <p className="mb-8 leading-relaxed">Indulge in the timeless beauty of Pad Jewels. From stunning diamonds to lustrous pearls, we offer a curated collection that embodies sophistication and style. Elevate your look with our exquisite pieces, meticulously crafted to perfection.</p>
            <div className="flex justify-center">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => navigate('/shop-list-standard')}>Explore Now</button>
                <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"onClick={() => navigate('/about')} >About Us</button>
            </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src={img}/>
        </div>
    </div>
</section>

    )
}
export default AboutBanner