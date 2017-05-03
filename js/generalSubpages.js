function schimbaCuloarea () 
{
	var nightModeButton = document.getElementsByClassName("nightModeButton");
    var paragraphs = document.getElementsByTagName('P');
    var links = document.getElementsByTagName('A');
    var columnButton = document.getElementById("columnButton");

	if (document.body.style.background != "rgb(15, 15, 15)")
    {
    	document.body.style.background = "#0f0f0f";
        nightModeButton[0].style.borderColor = "#fafafa";
        nightModeButton[0].style.background = "#0f0f0f"; 
        nightModeButton[0].id = "blackBG";

        columnButton.style.borderColor = "#fafafa";
        columnButton.style.color = "#fafafa";
        columnButton.style.background = "#0f0f0f";
        
        localStorage.setItem("BGColor", "#0f0f0f");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#fafafa";  

        }  
        for (var i = 0; i < paragrahps.length; i++)
        {
            paragraphs[i].style.color = "#fafafa";  

        }  


    }
    else
    {
    	document.body.style.background = "#fafafa";
        nightModeButton[0].style.borderColor = "#0f0f0f";
        nightModeButton[0].style.background = "#fafafa"; 
        nightModeButton[0].id = "whiteBG";

        columnButton.style.borderColor = "#0f0f0f";
        columnButton.style.color = "#0f0f0f";
        columnButton.style.background = "#fafafa";

        localStorage.setItem("BGColor", "#fafafa");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#0f0f0f";  

        }  
        for (var i = 0; i < paragrahps.length; i++)
        {
            paragraphs[i].style.color = "#0f0f0f";  

        }  
    }
}

function storage()
{
    var nightModeButton = document.getElementsByClassName("nightModeButton");
    var paragraphs = document.getElementsByTagName('p');
    var links = document.getElementsByTagName('A');


    var grid = document.getElementsByClassName("grid");
    var item = document.getElementsByClassName("item");
    var oneColumnWidth;

    if (localStorage.getItem("columnNumber") == 3)
    {
        changeColumns();
        changeIcon();
    }
    else
    {
        document.getElementById("columnButton").innerText = "▣";
    }

    if (localStorage.getItem("BGColor") === "#0f0f0f")
    {
        document.body.style.background = "#0f0f0f";
        nightModeButton[0].style.borderColor = "#fafafa";
        nightModeButton[0].style.background = "#0f0f0f"; 
        nightModeButton[0].id = "blackBG";

        columnButton.style.borderColor = "#fafafa";
        columnButton.style.color = "#fafafa";
        columnButton.style.background = "#0f0f0f";

        localStorage.setItem("BGColor", "#0f0f0f");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#fafafa";  

        }  
        for (var i = 0; i < paragrahps.length; i++)
        {
            paragraphs[i].style.color = "#fafafa";  

        }  

    }
    else
    {
        document.body.style.background = "#fafafa";
        nightModeButton[0].style.borderColor = "#0f0f0f";
        nightModeButton[0].style.background = "#fafafa"; 
        nightModeButton[0].id = "whiteBG";

        columnButton.style.borderColor = "#0f0f0f";
        columnButton.style.color = "#0f0f0f";
        columnButton.style.background = "#fafafa";

        localStorage.setItem("BGColor", "#fafafa");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#0f0f0f";  

        }  
        for (var i = 0; i < paragrahps.length; i++)
        {
            paragraphs[i].style.color = "#0f0f0f";  

        }  

    }

}

function shufflePhotos()
{
    var photos = document.getElementsByClassName("item");
    var photoNames = [];

    var pathName = photos[0].src;
    pathName = pathName.slice(0, -4); //stripping off ".jpg"
    pathName = pathName.replace(/[_0-9]+$/, ''); //stripping off the index


    for (var i = 1; i <= photos.length; i++)
    {
        photoNames[i - 1] = pathName + i + ".jpg";
    }

    
    for (var i = 0; i < photos.length - 1; i++)
    {
        var j = Math.floor(Math.random() * (photos.length - i)) + i;

        var temp = photoNames[i];
        photoNames[i] = photoNames[j];
        photoNames[j] = temp;
    }



    for (var i = 0; i < photos.length; i++)
    {
        photos[i].src = photoNames[i];
    }
}

function onLoad()
{
    shufflePhotos();
    storage();
}

function changeColumns()
{
    var grid = document.getElementsByClassName("grid");
    var item = document.getElementsByClassName("item");
    var oneColumnWidth;

    if (window.innerWidth > 1280)
    {
        oneColumnWidth = "45%";
    }
    else if (window.innerWidth > 800)
    {
        oneColumnWidth = "70%";
    }
    else
    {
        oneColumnWidth = "80%";
    }

    if (grid[0].style.columnCount > 1)
    {
        grid[0].style.columnCount = 1;
        grid[0].style.width = oneColumnWidth;
        for (var i = 0; i < item.length; i++)
        {
            item[i].style.paddingBottom = "2em";
        }

        document.getElementById("columnButton").innerText = "▣";

        localStorage.setItem("columnNumber", "1");
    }
    else
    {
        var nrColoane = Math.floor((window.innerWidth) / 400) + 1;
        grid[0].style.columnCount = nrColoane;
        grid[0].style.width = "90%";

        for (var i = 0; i < item.length; i++)
        {
            item[i].style.paddingBottom = "1em";
        }
        document.getElementById("columnButton").innerText = "▥";

        localStorage.setItem("columnNumber", "3");

    }

    changeIcon();

}

function changeIcon()
{
    var currentIcon = document.getElementById("columnButton").innerText;

    if (currentIcon === "▥")
    {
        document.getElementById("columnButton").innerText = "▣";
    }
    else
    {
        document.getElementById("columnButton").innerText = "▥";
    }
}
