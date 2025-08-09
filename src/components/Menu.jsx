// Menu.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MENU_URL } from '../utils/constants';
import axios from 'axios';
import MenuCategory from './MenuCategory'; // ✅ use new parent component

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

            const menuDetails =
                response?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
            const resDetail = response?.data?.data?.cards[2]?.card?.card?.info;

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
        <div className="menu-page">
            <div className="menu-heading">
                <div><h1>{name}</h1></div>
                <div>
                    <h2>
                        Location - {city} | Rating - {avgRatingString} ⭐ | Cost for two - ₹{costForTwo / 100}
                    </h2>
                </div>
            </div>

            <div className="menu-container">
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
                            return (
                                <MenuCategory // ✅ using new component
                                    key={idx}
                                    title={title}
                                    itemCards={itemCards}
                                    isExpanded={expandedCategories[title]}
                                    onToggle={toggleCategory}
                                />
                            );
                        })
                )}
            </div>
        </div>
    );
};

export default Menu;
