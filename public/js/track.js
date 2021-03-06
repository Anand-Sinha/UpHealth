import Cookies from './js.cookie.mjs'




const trackForm = document.querySelector('.track-form');
  let user = Cookies.get('user');
  user = user.split(':')[1]
  const streamId = '0x0851a0cd25da463b734a0673afde406589a47ed7%2FFitness-data'
  // const user = document.cookie.split(';')
  var FatArray = JSON.parse(localStorage.getItem('fat'));
  var bmiArray = JSON.parse(localStorage.getItem('bmi'));
  var weigthArray = JSON.parse(localStorage.getItem('weigth'));
  var sugarArray = JSON.parse(localStorage.getItem('sugar'));
  var bloodPressureArray = JSON.parse(localStorage.getItem('bp'));

  if (FatArray === null) {
    localStorage.setItem('fat', JSON.stringify([0]))
    localStorage.setItem('bmi', JSON.stringify([0]))
    localStorage.setItem('weigth', JSON.stringify([0]))
    localStorage.setItem('sugar', JSON.stringify([0]))
    localStorage.setItem('bp', JSON.stringify([0]))

    FatArray = JSON.parse(localStorage.getItem('fat'));
    bmiArray = JSON.parse(localStorage.getItem('bmi'));
    weigthArray = JSON.parse(localStorage.getItem('weigth'));
    sugarArray = JSON.parse(localStorage.getItem('sugar'));
    bloodPressureArray = JSON.parse(localStorage.getItem('bp'));
  }


  if (FatArray.length > 8) {
    FatArray.shift();
    bmiArray.shift();
    weigthArray.shift();
    sugarArray.shift();
    bloodPressureArray.shift();
    console.log('We are in IF')
  }


  trackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form is submitted')
    console.log(user)

    

    

    const fat = document.getElementById('fat').value;
    const bmi = document.getElementById('bmi').value;
    const weigth = document.getElementById('weight').value;
    const sugar = document.getElementById('sugar').value;
    const bp = document.getElementById('bp').value;
    FatArray.push(fat)
    bmiArray.push(bmi)
    weigthArray.push(weigth)
    sugarArray.push(sugar)
    bloodPressureArray.push(bp)

    localStorage.setItem('fat', JSON.stringify(FatArray))
    localStorage.setItem('bmi', JSON.stringify(bmiArray))
    localStorage.setItem('weigth', JSON.stringify(weigthArray))
    localStorage.setItem('sugar', JSON.stringify(sugarArray))
    localStorage.setItem('bp', JSON.stringify(bloodPressureArray))
    // console.log(fat,bmi,weigth,sugar,bp);

    // https://streamr.network/api/v1/streams/MY-STREAM-ID/data


    // clearing the input values
    document.getElementById('fat').value = "";
    document.getElementById('bmi').value = "";
    document.getElementById('weight').value = "";
    document.getElementById('sugar').value = "";
    document.getElementById('bp').value = "";

    var chart = document.getElementById("infChart").getContext("2d");

    var healthChart = new Chart(chart, {
      type: 'line',
      data: {
        labels: ['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [{
            label: 'Fat (%)',
            // data: [18.50, 18.70, 18.40, 19.20, 19.20, 18.80, 17.90, 18.70],
            data: FatArray,
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderDash: [0, 500],
            borderColor: 'rgba(255,0,0)',
            pointRadius: 0,
            pointHoverRadius: 12,
          },
          {
            label: 'BMI',
            // data: [21.00, 21.30, 21.40, 21.80, 21.80, 21.60, 22.10, 22.50],
            data: bmiArray,
            backgroundColor: 'rgba(255,120,255,0.3)',
            borderDash: [0, 500],
            borderColor: 'rgba(255,120,255)',
            pointRadius: 0,
            pointHoverRadius: 12,
          },
          {
            label: 'Weight (Kg)',
            // data: [65.45, 66.00, 66.55, 67.55, 67.55, 67.15, 68.6, 69.74],
            data: weigthArray,
            backgroundColor: 'rgba(54, 162, 235,0.3)',
            borderDash: [0, 500],
            borderColor: 'rgba(54, 162, 235)',
            pointRadius: 0,
            pointHoverRadius: 12,
          },
          {
            label: 'Blood Sugar',
            // data: [88, 93, 90, 99, 95, 91, 89, 87],
            data: sugarArray,
            backgroundColor: 'rgba(0,225,120,0.3)',
            borderDash: [0, 500],
            borderColor: 'rgba(0,225,120)',
            pointRadius: 0,
            pointHoverRadius: 12,
          },
          {
            label: 'Blood Pressure (U)',
            // data: [117, 120, 114, 113, 118, 117, 115, 118],
            data: bloodPressureArray,
            backgroundColor: 'rgba(120,120,120,0.3)',
            borderDash: [0, 500],
            borderColor: 'rgba(120,120,120)',
            pointRadius: 0,
            pointHoverRadius: 12,
          }
        ]
      },
      options: {
        // responsive: false,
        title: {
          display: true,
          text: "Your Health Chart",
          position: "top",
          fontSize: 26,
        },
        legend: {
          display: true,
          position: "right",
        },
        tooltips: {
          // mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'index'
        },
        animation: {
          duration: 2500,
        },
        scales: {
          xAxes: [{
            display: true,
            // gridLines:{
            //   display: false,
            // },
            scaleLabel: {
              display: true,
              labelString: 'Last 10 days',
              fontSize: 19,
            }
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Values',
              fontSize: 19,
            },
            // ticks:{
            //   min:0,
            //   max:120
            // }
          }]
        }
      },
    });

    const data={
        fitnessData:[FatArray,bmiArray,weigthArray,bloodPressureArray,sugarArray]
    }

    // try {
    //     const fitnessData = await axios({
    //         url:`https://streamr.network/api/v1/streams/${streamId}/data`,
    //         method: 'POST',
    //         data:data
    //     })
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        await axios({
            url:'/api/user/fitness',
            method:'POST',
            data
        })
    } catch (error) {
        console.log(error)
    }

  })
  const dataUnionTab = document.getElementById('data-union-tab')
  window.addEventListener('load', async () => {
    try {
      const results = await axios({
        method: 'GET',
        url: '/api/prescription/my-prescriptions'
      })

      const coins = await axios({
        method:'GET',
        url:'/api/prescription/my-dataunion-stats'
      })
      // console.log(coins.data.data[0].stats.earnings)
      dataUnionTab.innerHTML = `<i style="margin-left: 5px;"class="fas fa-coins"></i> Data Coins: ${coins.data.data[0].stats.earnings}`
    } catch (error) {
      console.log(error)
    }
  })