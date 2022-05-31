document.body.style.overflow = 'hidden';
document.querySelector('html').scrollTop = window.scrollY;
$(window).on("load",function(){
  console.log("done");
  $(".first").fadeOut(500);
  setTimeout(function(){
    $(".second").fadeIn("fast");
  },500);
  document.body.style.overflow = null;
});
var lightFlag = true;
    if(localStorage.getItem('theme') === null){
        localStorage.setItem('theme',JSON.stringify(lightFlag))
    } else{
        lightFlag = JSON.parse(localStorage.getItem('theme'))
        if(!lightFlag) {
            lightFlag = !lightFlag;
            change();
        }
    }

    window.addEventListener("scroll",function(){
    var nav = document.getElementById("navBar");
    var ham = document.getElementById("hamMenu");
    // var top = document.getElementById("goToTop");
    nav.classList.toggle("sticky",window.scrollY>0);
    ham.classList.toggle("hide",window.scrollY==0);
    if(window.scrollY<100)
        $(".btn-dange").hide();
    else{
        $(".btn-dange").show();
    }
    $(".toShow").show();
    });
    $(".toShow").show();
    var chk = document.getElementById("checkbox");
    chk.addEventListener("change",change);

    function change(){
        lightFlag = !lightFlag;
        localStorage.setItem('theme',JSON.stringify(lightFlag));
        // console.log(lightFlag);
        $("body").toggleClass('dark');
        // $(".navbar").toggleClass('navDark');
        if (!lightFlag){
            $("body").css("background-image", "url('./img/bgDark1.png')");
            $(".iphoneDark").attr("src", "img/iphoneDark.png");
            $("video").attr("src", "/video/FinalB.mp4");
            $(".first").css("background", "black");
            // document.styleSheets[0].insertRule('::-webkit-scrollbar-thumb {border-color: black !important}', 0);
            $("#iframe_map").attr("src", "https://api.mapbox.com/styles/v1/anandsinha/ckhrd2yni0cj119s04i10r8pp.html?fresh=true&title=false&access_token=pk.eyJ1IjoiYW5hbmRzaW5oYSIsImEiOiJja2hyYzk0aGUwdDZzMnZtZ2s3aTBnY2JuIn0.PXvDmTKh5I2l_Qd6CI7ttw");
            setTimeout(function(){
          $(".textBox").text("Go Light");
        }, 700);
          }
        else{
            $("body").css("background-image", "url('./img/bg8.png')");
            $(".iphoneDark").attr("src", "img/iphone.png");
            $("video").attr("src", "/video/Final.mp4");
            $(".first").css("background", "white");
            $("#iframe_map").attr("src", "https://api.mapbox.com/styles/v1/anandsinha/ckhrcs3r008jx19mu1fdf54nl.html?fresh=true&title=false&access_token=pk.eyJ1IjoiYW5hbmRzaW5oYSIsImEiOiJja2hyYzk0aGUwdDZzMnZtZ2s3aTBnY2JuIn0.PXvDmTKh5I2l_Qd6CI7ttw");
            setTimeout(function(){
          $(".textBox").text("Go Dark");
        }, 750);
          }
        $(".fontWhite").toggleClass("colorWhite");
        $(".blueBack").toggleClass("BackBlue");
        $(".bgCol").toggleClass("bgColAdd");
        $("#hamMenu").toggleClass("bgColWhite");
        $(".font-black").toggleClass("fontBlack");
    }


    // JAVASCRIPT for LOGGING-OUT
    const logoutBtn = document.getElementById('logout');
    if(logoutBtn){
        logoutBtn.addEventListener('click',async ()=>{
            try {
                const result = await axios({
                    method:"GET",
                    url:'/api/user/logout'
                })
                console.log(result)
                if(result.data.status === 'success') location.reload(true)
            } catch (error) {
                console.log(error)
            }
        })
    }


    $("#signUpOne").click(function(){
      $(".toHide").fadeOut(100);
      setTimeout(function(){
        $(".hide").slideDown(500);
      },100)

    });

    function myFunction() {
      var age = document.getElementById("age").value;
      var sex = document.getElementById("gender").value == "M" ? 1 : 0;
      var cigs = document.getElementById("smoke").value == "Y" ? 4 : 0;
      var chol = document.getElementById("chol").value;
      var sBP = document.getElementById("bpH").value;
      var dBP = document.getElementById("bpL").value;
      var diab = document.getElementById("diab").value == "Y" ? 1 : 0;
      var gluc = document.getElementById("gluc").value;
      var hRate = document.getElementById("Hrate").value;
      var result;
      var percentage;
      
      fetch('https://heartapi.herokuapp.com/predict?age=' + age + '&sex=' + sex + '&cigs=' + cigs + '&chol=' + chol + '&sBP=' + sBP + '&dia=' + diab + '&dBP=' + dBP + '&gluc=' + gluc + '&hRate=' + hRate + '')
          .then(response =>{
              return response.json();
          }).then(data =>{
            result = data.prediction[0]==0 ? "Don't Have a" : "Have a ";
            percentage = (data.probability[0][data.prediction[0]] * 100).toFixed(1);
            const element = document.getElementById("predictionResult");
            element.style.display = "none";
            document.getElementById("predictionResult1").style.display = "inline";

            document.getElementById("percent").innerHTML = percentage + "%";
            document.getElementById("prediction").innerHTML = result;
            document.getElementById("percent").style.color = data.prediction[0]==0 ? "#00FF00" : "#FF0000";
            document.getElementById("prediction").style.color = data.prediction[0]==0 ? "#00FF00" : "#FF0000";
          })
    }
