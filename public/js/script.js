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
    // 0	age	0.321668
    // 1	gender	0.022046
    // 2	height	0.143443
    // 3	weight	0.161850
    // 4 	ap_hi	0.228123 
    // 5	ap_lo	0.042572
    // 6	cholesterol	0.030725
    // 7	gluc	0.019934
    // 8	smoke	0.009101
    // 9	alco	0.006331
    // 10	active	0.014208

    function myFunction() {
    
      let val = [18393,2,168,62.0,110,80,1,1,0,0,1];
      let arr = [0.321668,0.022046,0.143443,0.161850,0.228123,0.042572,0.030725,0.019934,0.009101,0.006331,0.014208];
      let sum = 0;
      for(let i=0;i<val.length;i++){
        sum += arr[i]*val[i];
      }
      https://heartapi.herokuapp.com/predict?age=21&sex=1&cigs=5&chol=230&sBP=280&dia=0&dBP=90&gluc=87&hRate=84
      fetch('https://heartapi.herokuapp.com/predict?age=21&sex=1&cigs=5&chol=230&sBP=280&dia=0&dBP=90&gluc=87&hRate=84')
          .then(response =>{
              return response.json();
          }).then(data =>{
              console.log(data);
          })
      console.log(sum);
      document.getElementById("predict-yes").innerHTML = "Hello World";
    }