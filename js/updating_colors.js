function renderFavColorPicker() {
    var template = document.getElementById("fav-color")
    template.removeAttribute("hidden")
}

//This is called when a color is clicked in the popup
function updateColorData(name) {
    removeCheckMarks()
    color_data.forEach(function (arr_data) {
        if (name == arr_data.name) {
            data.current_color.name = arr_data.name
            data.current_color.color_code = arr_data.color_code
            data.current_color.off_color_code = arr_data.off_color_code
        }
    })
    addCheckmarktoCurrentColor()
}


function changeColor() {
    ajax( {color: data.current_color.name} )
    
    var elements
    elements = document.getElementsByClassName("color")
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = data.current_color.color_code
    }

    elements = document.getElementsByClassName("border-color")
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.borderColor = data.current_color.color_code
    }

    elements = document.getElementsByClassName("off-color")
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.color = data.current_color.off_color_code
    }
}

function updateColorClicked() {
    changeColor();
    document.getElementById("fav-color").setAttribute("hidden", "hidden")
    modal.classList.add("fade-out")
}

function removeCheckMarks() {
    var checkmarks = document.getElementsByClassName("checkmark")

    for(let checkmark of checkmarks) {
        checkmark.parentNode.removeChild(checkmark)
    }
}


function addCheckmarktoCurrentColor() {
    colorPreviews = document.getElementsByClassName("color-preview")

    for (let preview of colorPreviews) {
        if (preview.id == data.current_color.name) {
            preview.innerHTML = "<i class='fas fa-check checkmark'></i>"
        }
    }
}