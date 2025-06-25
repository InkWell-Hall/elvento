import VendorAdvertCard from '../components/VendorAdvertCard.jsx';
import asset6 from '../assets/image6.png';
import assets7 from '../assets/image7.png';
import assets8 from '../assets/image8.png';
// import assets8 from '../assets/assets8.jpg';


const VendorAdvert = () => {
    const data = [
        {
            title: "Ball gown",
            image: image8,
            price: 85,
            oldPrice:100,
            discount: 15
        },
        {
            title: "Evening gown",
            image: image7,
            price: 212,
            oldPrice:250,
            discount: 37.50
        },
        {
            title: "Maxi dress",
            image: image8,
            price: 102,
            oldPrice: 120,
            discount: 18
        },
        {
            title: "Tea dress",
            image: image6,
            price: 68,
            oldPrice:80,
            discount:12
        },
        {
            title: "Wrap dress",
            image: image6,
            price: 170,
            oldPrice:200 ,
            discount: 30
        },
        {
            title: "Sun dress",
            image: image6,
            price: 39,
            oldPrice: 45,
            discount: 6.75
        },
        {
            title: "Mini dress",
            image: image6,
            price: 59,
            oldPrice:70,
            discount: 10.50
        },
        {
            title: "Fit-and-flare dress",
            image: image6,
            price: 38,
            oldPrice: 45,
            discount: 6.75
        },
        {
            title: "Silacs rubisx",
            image: image6,
            price: 43,
            oldPrice: 50,
            discount: 7.50
        },
         {
            title: "Silacs rubisx",
            image: image6,
            price: 43,
            oldPrice: 50,
            discount: 7.50
        },
    ];

    return (
        <div>
            <div className="flex flex-wrap md:justify-center justify-around gap-10 md:ml-">
                {data.map((item, index) => (
                    <VendorAdvertCard
                        key={index}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        oldPrice={item.oldPrice}
                        discount={item.discount}
                    />
                ))}
            </div>
        </div>
    );
};

export default VendorAdvert;


