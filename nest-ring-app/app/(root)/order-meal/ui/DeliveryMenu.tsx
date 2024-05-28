import Image from "next/image";

const deliveryMenu = {
  chefsChoice: {
    category: "Main Dishes",
    subCategory: "with beef",
    name: "Beef chips",
    price: 250,
    imageUrl: null,
    description: "Crispy beef chips, a delightful snack or meal.",
    calories: 600,
    rating: 4.3,
    timeCreated: "2024-05-27T20:15:30.000Z",
    timeUpdated: "2024-05-27T20:15:30.000Z",
    isChefsChoice: true,
  },
  categories: [
    {
      name: "Beverages",
      subCategories: [
        {
          name: "cold",
          values: [
            {
              category: "Beverages",
              subCategory: "cold",
              name: "Dasani mineral water (500ml)",
              price: 50,
              imageUrl: null,
              description: "Pure and refreshing Dasani mineral water (500ml).",
              calories: 0,
              rating: 4.4,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "cold",
              name: "Dasani mineral water (1L)",
              price: 80,
              imageUrl: null,
              description: "Pure and refreshing Dasani mineral water (1L).",
              calories: 0,
              rating: 4.4,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "cold",
              name: "Soda 300ml",
              price: 50,
              imageUrl: null,
              description: "Refreshing soda (300ml) to quench your thirst.",
              calories: 150,
              rating: 4.3,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "cold",
              name: "Yoghurt (strawberry or vanilla)",
              price: 70,
              imageUrl: null,
              description:
                "Creamy yoghurt available in strawberry or vanilla flavors.",
              calories: 200,
              rating: 4.2,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
          ],
        },
        {
          name: "hot",
          values: [
            {
              category: "Beverages",
              subCategory: "hot",
              name: "Tea",
              price: 30,
              imageUrl: null,
              description: "Classic hot tea, a perfect start to your day.",
              calories: 50,
              rating: 4.0,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "hot",
              name: "Special Tea",
              price: 50,
              imageUrl: null,
              description:
                "A special blend of tea for a refreshing experience.",
              calories: 60,
              rating: 4.1,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "hot",
              name: "Masala/Ginger Tea",
              price: 50,
              imageUrl: null,
              description:
                "Spicy masala or ginger tea to invigorate your senses.",
              calories: 70,
              rating: 4.2,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "hot",
              name: "Black Coffee/Chocolate",
              price: 40,
              imageUrl: null,
              description: "Rich black coffee or hot chocolate, your choice.",
              calories: 80,
              rating: 4.3,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "hot",
              name: "Whites Coffee/Chocolate",
              price: 50,
              imageUrl: null,
              description:
                "Creamy white coffee or hot chocolate, perfect for a treat.",
              calories: 100,
              rating: 4.1,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "hot",
              name: "Lemon Tea",
              price: 50,
              imageUrl: null,
              description:
                "Refreshing lemon tea, perfect for any time of the day.",
              calories: 60,
              rating: 4.2,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "hot",
              name: "Dawa (Ginger, Garlic, Lemon, Honey)",
              price: 80,
              imageUrl: null,
              description:
                "A healing drink made with ginger, garlic, lemon, and honey.",
              calories: 90,
              rating: 4.4,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "hot",
              name: "Milk",
              price: 40,
              imageUrl: null,
              description: "Fresh hot milk, simple and satisfying.",
              calories: 120,
              rating: 4.0,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Beverages",
              subCategory: "hot",
              name: "White Milo",
              price: 40,
              imageUrl: null,
              description: "Hot white Milo, a delightful treat for any time.",
              calories: 150,
              rating: 4.1,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
          ],
        },
      ],
    },
    {
      name: "Snacks",
      subCategories: [
        {
          name: "Baked",
          values: [
            {
              category: "Snacks",
              subCategory: "Baked",
              name: "Chocolate Chip Cookie",
              price: 30,
              imageUrl: null,
              description: "A classic chewy chocolate chip cookie.",
              calories: 250,
              rating: null,
              timeCreated: "2024-05-28T10:33:00.000Z",
              timeUpdated: "2024-05-28T10:33:00.000Z",
              isChefsChoice: false,
            },
            {
              category: "Snacks",
              subCategory: "Baked",
              name: "Mini Pizza (Margherita)",
              price: 80,
              imageUrl: null,
              description:
                "A small pizza with tomato sauce and mozzarella cheese.",
              calories: 400,
              rating: null,
              timeCreated: "2024-05-28T10:33:00.000Z",
              timeUpdated: "2024-05-28T10:33:00.000Z",
              isChefsChoice: false,
            },
          ],
        },
      ],
    },
    {
      name: "Main Dish",
      subCategories: [
        {
          name: "with njahi",
          values: [
            {
              category: "Main Dishes",
              subCategory: "with njahi",
              name: "Njahi plain",
              price: 120,
              imageUrl: null,
              description: "Plain njahi beans, simple and nutritious.",
              calories: 160,
              rating: 4.1,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Main Dishes",
              subCategory: "with njahi",
              name: "Njahi with chapatti",
              price: 150,
              imageUrl: null,
              description: "Njahi beans served with soft chapatti.",
              calories: 350,
              rating: 4.0,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Main Dishes",
              subCategory: "with njahi",
              name: "Njahi with rice/mataha",
              price: 180,
              imageUrl: null,
              description: "Nutritious njahi beans paired with rice or mataha.",
              calories: 400,
              rating: 4.1,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Main Dishes",
              subCategory: "with njahi",
              name: "Njahi special with ugali/chapatti",
              price: 180,
              imageUrl: null,
              description:
                "Special njahi beans served with your choice of ugali or chapatti.",
              calories: 450,
              rating: 4.2,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Main Dishes",
              subCategory: "with njahi",
              name: "Njahi special with rice/mataha",
              price: 220,
              imageUrl: null,
              description: "Special njahi beans paired with rice or mataha.",
              calories: 500,
              rating: 4.3,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
          ],
        },
        {
          name: "with Beans",
          values: [
            {
              category: "Main Dishes",
              subCategory: "with beans",
              name: "Beans plain",
              price: 100,
              imageUrl: null,
              description:
                "Simple and delicious plain beans cooked to perfection.",
              calories: 150,
              rating: 4.2,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Main Dishes",
              subCategory: "with beans",
              name: "Beans with ugali/chapatti",
              price: 130,
              imageUrl: null,
              description:
                "Tasty beans served with your choice of ugali or chapatti.",
              calories: 350,
              rating: 4.0,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Main Dishes",
              subCategory: "with beans",
              name: "Beans with rice/mataha",
              price: 150,
              imageUrl: null,
              description:
                "Flavorful beans paired with rice or mataha for a hearty meal.",
              calories: 400,
              rating: 4.1,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
            {
              category: "Main Dishes",
              subCategory: "with beans",
              name: "Beans special with ugali/chapatti",
              price: 170,
              imageUrl: null,
              description:
                "Special beans dish served with your choice of ugali or chapatti.",
              calories: 450,
              rating: 4.3,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: true,
            },
            {
              category: "Main Dishes",
              subCategory: "with beans",
              name: "Beans special with rice/mataha",
              price: 200,
              imageUrl: null,
              description:
                "Special beans dish paired with rice or mataha for a satisfying meal.",
              calories: 500,
              rating: 4.4,
              timeCreated: "2024-05-27T20:15:30.000Z",
              timeUpdated: "2024-05-27T20:15:30.000Z",
              isChefsChoice: false,
            },
          ],
        },
      ],
    },
  ],
};

const DeliveryMenu = () => {
  return (
    <section className="w-full h-full flex flex-col mt-5 mb-20 gap-7">
      {/* Chefs choice */}
      <div className=" w-full flex items-center justify-center">
        <div className="w-[350px] h-52 bg-figma-orange rounded-2xl flex flex-row justify-between gap-3 p-3 overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 ease-in">
          <Image
            src={
              deliveryMenu.chefsChoice.imageUrl || "/order-meal/food-image.png"
            }
            alt=""
            width={500}
            height={500}
            className="w-[45%] h-auto rounded-lg"
          />
          <div className="w-1/2 text-black flex flex-col justify-between items-start overflow-y-auto">
            <h3 className=" font-bold text-xl text-center self-center underline mb-2">
              Chefs Choice
            </h3>
            <div className=" flex flex-col">
              <h4 className="font-bold text-lg">
                {deliveryMenu.chefsChoice.name}
              </h4>
              <span>{deliveryMenu.chefsChoice.description}</span>
            </div>
            <span className=" font-bold text-2xl">
              Ksh. {deliveryMenu.chefsChoice.price}
            </span>
            <div className=" flex flex-row items-center gap-1 self-end -mt-2">
              <Image
                src={"/order-meal/icons/star-icon.svg"}
                alt=""
                width={15}
                height={15}
              />
              <span>{deliveryMenu.chefsChoice.rating}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Menu */}
      <div className="w-full h-full flex flex-col items-start gap-6 overflow-hidden px-2">
        {deliveryMenu.categories.map((category) => (
          <div
            key={category.name}
            id={`category-${category.name}`}
            className="w-full flex flex-col gap-2 items-start shrink-0"
          >
            <label
              htmlFor={`category-${category.name}`}
              className=" text-5xl font-semibold self-center font-serif"
            >
              {category.name}
            </label>
            {category.subCategories.map((subCategory) => (
              <div
                key={`${category.name}-${subCategory.name}`}
                id={`subCategory-${category.name}-${subCategory.name}`}
                className="w-full flex flex-col gap-2"
              >
                <label
                  htmlFor={`subCategory-${category.name}-${subCategory.name}`}
                  className=" text-xl font-bold font-serif"
                >
                  {subCategory.name}
                </label>
                <div className=" w-full flex flex-row items-center gap-3 overflow-hidden hover:overflow-x-auto shrink-0">
                  {subCategory.values.map((foodObj) => (
                    <div
                      key={`${category.name}-${subCategory.name}-${foodObj.name}`}
                      className="w-[200px] h-[220px] border hover:border-figma-brown border-b-4 shrink-0 rounded-sm rounded-t-lg transition-colors duration-300 hover:text-figma-brown cursor-pointer"
                    >
                      <div className=" w-full h-1/2">
                        <Image
                          src={foodObj.imageUrl || "/order-meal/food-image.png"}
                          alt=""
                          width={500}
                          height={500}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-full h-1/2 p-2 flex flex-col justify-between">
                        <span className=" font-semibold text-md">
                          {foodObj.name}
                        </span>
                        <div className=" flex flex-row justify-between">
                          <span className=" text-lg">Ksh. {foodObj.price}</span>
                          <div className=" flex flex-row items-center gap-1 self-end">
                            <Image
                              src={"/order-meal/icons/star-icon.svg"}
                              alt=""
                              width={15}
                              height={15}
                            />
                            <span className=" text-xs">{foodObj.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeliveryMenu;
