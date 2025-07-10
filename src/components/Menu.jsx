import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MENU_URL } from '../utils/constants';
import axios from 'axios';

const Menu = () => {
    const { resId } = useParams();

    const [menuList, setMenuList] = useState([]);
    const [resDetails, setResDetails] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});

    useEffect(() => {
        fetchMenuItems();
    }, [resId]);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get(MENU_URL + resId);

            const menuDetails = response?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
            const resDetail = response?.data?.data?.cards[2]?.card?.card?.info;

            // Set restaurant details
            setResDetails(resDetail);
            setMenuList(menuDetails);

            // Expand all categories by default
            const defaultExpanded = {};
            menuDetails.forEach((item) => {
                if (
                    item.card?.card?.["@type"] ===
                    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
                ) {
                    const title = item.card.card.title;
                    defaultExpanded[title] = true;
                }
            });
            setExpandedCategories(defaultExpanded);
        } catch (err) {
            console.error("Error fetching menu data:", err);
        }
    };

    const toggleCategory = (title) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    if (!resDetails) return <h2>Loading...</h2>;

    const { name, city, avgRatingString, costForTwo } = resDetails;

    return (
        <div className='menu-page'>
            <div className='menu-heading'>
                <div><h1>{name}</h1></div>
                <div>
                    <h2>
                        Location - {city} | Rating - {avgRatingString} ⭐ | Cost for two - ₹{costForTwo / 100}
                    </h2>
                </div>
            </div>

            <div className='menu-container'>
                <h2 style={{ margin: "20px" }}>Menu:</h2>
                {menuList.length === 0 ? (
                    <p>No menu items available.</p>
                ) : (
                    menuList
                        .filter(
                            (mainCategory) =>
                                mainCategory.card?.card?.["@type"] ===
                                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
                        )
                        .map((mainCategory, idx) => {
                            const { title, itemCards } = mainCategory.card.card;
                            const isExpanded = expandedCategories[title];

                            return (
                                <div key={idx} className="menu-category">
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            color: '#007bff',
                                            marginBottom: '10px'
                                        }}
                                        onClick={() => toggleCategory(title)}
                                    >
                                        <h4>{title} {isExpanded ? '🔽' : '▶️'}</h4>
                                    </div>

                                    {isExpanded && itemCards?.map((item) => {
                                        const { id, name, description, price, defaultPrice, imageId } = item.card.info;
                                        return (
                                            <div key={id} className="menu-item" style={{ marginLeft: '20px' }}>
                                                <h5>{name} - ₹{(defaultPrice || price || 0) / 100}</h5>
                                                <p>{description}</p>
                                                {imageId && (
                                                    <img
                                                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${imageId}`}
                                                        alt={name}
                                                        style={{
                                                            width: '200px',
                                                            borderRadius: '8px',
                                                            marginTop: '8px'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })
                )}
            </div>
        </div>
    );
};

export default Menu;


// menuCategory.map((cat)=>{menuList.filter((res) => { res.
//                 const { id, name, category, description, defaultPrice, price, imageId } = res.card.info;
//                 return (
//                     <div key={id} className='menu-item'>
//                         <div>
//                         <h3>{name} - ₹{(defaultPrice || price || 0) / 100}</h3>
//                         <p><strong>Category:</strong> {category}</p>
//                         <p><strong>Description:</strong> {description}</p>
//                         </div>
//                         <div>
//                         {imageId && (
//                             <img
//                                 src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${imageId}`}
//                                 alt={name}
//                                 style={{ width: '200px', borderRadius: '8px', marginTop: '8px' }}
//                             />
//                         )}
//                         </div>
//                     </div>
//                 );
//             })})
