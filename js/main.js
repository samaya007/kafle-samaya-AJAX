(() => {
  // Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  const spinner = `
  
  
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_zWVm{animation:spinner_5QiW 1.2s linear infinite,spinner_PnZo 1.2s linear infinite}.spinner_gfyD{animation:spinner_5QiW 1.2s linear infinite,spinner_4j7o 1.2s linear infinite;animation-delay:.1s}.spinner_T5JJ{animation:spinner_5QiW 1.2s linear infinite,spinner_fLK4 1.2s linear infinite;animation-delay:.1s}.spinner_E3Wz{animation:spinner_5QiW 1.2s linear infinite,spinner_tDji 1.2s linear infinite;animation-delay:.2s}.spinner_g2vs{animation:spinner_5QiW 1.2s linear infinite,spinner_CMiT 1.2s linear infinite;animation-delay:.2s}.spinner_ctYB{animation:spinner_5QiW 1.2s linear infinite,spinner_cHKR 1.2s linear infinite;animation-delay:.2s}.spinner_BDNj{animation:spinner_5QiW 1.2s linear infinite,spinner_Re6e 1.2s linear infinite;animation-delay:.3s}.spinner_rCw3{animation:spinner_5QiW 1.2s linear infinite,spinner_EJmJ 1.2s linear infinite;animation-delay:.3s}.spinner_Rszm{animation:spinner_5QiW 1.2s linear infinite,spinner_YJOP 1.2s linear infinite;animation-delay:.4s}@keyframes spinner_5QiW{0%,50%{width:7.33px;height:7.33px}25%{width:1.33px;height:1.33px}}@keyframes spinner_PnZo{0%,50%{x:1px;y:1px}25%{x:4px;y:4px}}@keyframes spinner_4j7o{0%,50%{x:8.33px;y:1px}25%{x:11.33px;y:4px}}@keyframes spinner_fLK4{0%,50%{x:1px;y:8.33px}25%{x:4px;y:11.33px}}@keyframes spinner_tDji{0%,50%{x:15.66px;y:1px}25%{x:18.66px;y:4px}}@keyframes spinner_CMiT{0%,50%{x:8.33px;y:8.33px}25%{x:11.33px;y:11.33px}}@keyframes spinner_cHKR{0%,50%{x:1px;y:15.66px}25%{x:4px;y:18.66px}}@keyframes spinner_Re6e{0%,50%{x:15.66px;y:8.33px}25%{x:18.66px;y:11.33px}}@keyframes spinner_EJmJ{0%,50%{x:8.33px;y:15.66px}25%{x:11.33px;y:18.66px}}@keyframes spinner_YJOP{0%,50%{x:15.66px;y:15.66px}25%{x:18.66px;y:18.66px}}</style><rect class="spinner_zWVm" x="1" y="1" width="7.33" height="7.33"/><rect class="spinner_gfyD" x="8.33" y="1" width="7.33" height="7.33"/><rect class="spinner_T5JJ" x="1" y="8.33" width="7.33" height="7.33"/><rect class="spinner_E3Wz" x="15.66" y="1" width="7.33" height="7.33"/><rect class="spinner_g2vs" x="8.33" y="8.33" width="7.33" height="7.33"/><rect class="spinner_ctYB" x="1" y="15.66" width="7.33" height="7.33"/><rect class="spinner_BDNj" x="15.66" y="8.33" width="7.33" height="7.33"/><rect class="spinner_rCw3" x="8.33" y="15.66" width="7.33" height="7.33"/><rect class="spinner_Rszm" x="15.66" y="15.66" width="7.33" height="7.33"/></svg>`;







  // Functions
  function modelLoaded() {
    hotspots.forEach((hotspot) => {
      hotspot.style.display = "block";
    });
  }



  function loadInfoBoxes() {
    // Make AJAX call here using Fetch API
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(data => {
        data.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
  
          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;
  
          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;
  
          const thumbnailElement = document.createElement("img");
          thumbnailElement.src = `images/${infoBox.thumbnail}`;
          thumbnailElement.alt = infoBox.heading;
  
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
          selected.appendChild(thumbnailElement);
        });
      })
      .catch(error => console.error("Error fetching info boxes:", error));
  }
  







  function loadMaterialInfo() {
    // Make AJAX call here using Fetch API

materialList.innerHTML=spinner;



    fetch("https://swiftpixel.com/earbud/api/materials")


    
      .then(response => response.json())


      
      .then(data => {
        materialList.innerHTML="";

        data.forEach((material) => {
          // Make a copy of the template
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          // Append the populated template to the ul
          materialList.appendChild(clone);


          
        });



      })



      .catch(error => console.error("Error fetching materials:", error));





  }







  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  // Load data from APIs
  loadInfoBoxes();
  loadMaterialInfo();
})();
