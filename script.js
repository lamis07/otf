const additemBtn = document.getElementById('additem');
const additemSec = document.getElementById('additemsec');
const category = document.getElementById('category');
const itemimg = document.getElementById('itemimage');
const savedWardrobe = localStorage.getItem("wardrobe");
const wardrobe = savedWardrobe ? JSON.parse(savedWardrobe) : [];
const wardrobeContainer = document.getElementById('wardrobecontainer');
const saveItemBtn = document.getElementById("additembtn");
const wardrobeBtn = document.getElementById("wardrbe");
const deletebtn = document.createElement("button");
const outfitBtn = document.getElementById("outfit");
const outfitsec = document.getElementById("outfitsec");



console.log(savedWardrobe);

additemBtn.addEventListener('click', function() { 
    additemsec.style.display = "block";
    wardrobeContainer.style.display = "none";
    outfitsec.style.display = "none";

   
});

saveItemBtn.addEventListener('click', function() {

    const reader = new FileReader();

    reader.onload = function() {

        const item = {
        category: category.value,
        image: reader.result
        };
        
        wardrobe.push(item);
        localStorage.setItem("wardrobe", JSON.stringify(wardrobe));
        console.log("Item saved:", item);
    };

    reader.readAsDataURL(itemimg.files[0]);

});
function displayItem(item) {
    const card = document.createElement("div");

    const image = document.createElement("img");
    image.src = item.image;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function() {

        const index = wardrobe.indexOf(item);

        console.log(index);

        wardrobe.splice(index, 1);

        localStorage.setItem("wardrobe", JSON.stringify(wardrobe));

        card.remove();
    });

    const cardname = document.createElement("button");
     cardname.textContent = item.category; 


    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function() {

    // Create category dropdown
    const select = document.createElement("select");

    const categories = [
        "dress",
        "hijab",
        "sweater",
        "vest",
        "accessory"
    ];

    categories.forEach(function(categoryName) {

        const option = document.createElement("option");

        option.value = categoryName;
        option.textContent = categoryName;

        if (categoryName === item.category) {
            option.selected = true;
        }

        select.appendChild(option);
    });


    // Create file input for a new photo
    const newImage = document.createElement("input");

    newImage.type = "file";
    newImage.accept = "image/*";


    // Create Save button
    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Save";


    // Put the editing elements inside the card
    card.appendChild(select);
    card.appendChild(newImage);
    card.appendChild(confirmBtn);


    // Save the changes
    confirmBtn.addEventListener("click", function() {

        // Update category
        item.category = select.value;


        // Check if the user selected a new image
        if (newImage.files.length > 0) {

            const reader = new FileReader();

            reader.onload = function() {

                item.image = reader.result;

                image.src = item.image;

                cardname.textContent = item.category;

                localStorage.setItem(
                    "wardrobe",
                    JSON.stringify(wardrobe)
                );

                select.remove();
                newImage.remove();
                confirmBtn.remove();
            };

            reader.readAsDataURL(newImage.files[0]);

        } else {

            // No new image was selected
            cardname.textContent = item.category;

            localStorage.setItem(
                "wardrobe",
                JSON.stringify(wardrobe)
            );

            select.remove();
            newImage.remove();
            confirmBtn.remove();
        }

    });

});
   

    
    card.appendChild(image);
    card.appendChild(deleteBtn);
    card.appendChild(editBtn);
    card.appendChild(cardname);

    wardrobeContainer.appendChild(card);
}

wardrobeBtn.addEventListener('click', function() {
    additemsec.style.display = "none";
    outfitsec.style.display = "none";

    wardrobeContainer.style.display = "block";

    wardrobeContainer.innerHTML = "";
    wardrobe.forEach(displayItem);
});   
  

outfitBtn.addEventListener("click", function(){ 
 
    outfitsec.style.display = "block";

    additemsec.style.display = "none";

    wardrobeContainer.style.display = "none";

   
});