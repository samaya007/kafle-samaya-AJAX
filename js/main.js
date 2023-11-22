(() => {
  // Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");


  const spinner =
      `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_9Mto{animation:spinner_5GqJ 1.6s linear infinite;animation-delay:-1.6s}.spinner_bb12{animation-delay:-1s}@keyframes spinner_5GqJ{12.5%{x:13px;y:1px}25%{x:13px;y:1px}37.5%{x:13px;y:13px}50%{x:13px;y:13px}62.5%{x:1px;y:13px}75%{x:1px;y:13px}87.5%{x:1px;y:1px}}</style><rect class="spinner_9Mto" x="1" y="1" rx="1" width="10" height="10"/><rect class="spinner_9Mto spinner_bb12" x="1" y="1" rx="1" width="10" height="10"/></svg>`;

  // Functions
  function modelLoaded() {
      hotspots.forEach((hotspot) => {
          hotspot.style.display = "block";
      });
  }

  function loadInfoBoxes() {
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
          .then(response => response.json())
          .then(data => {
              data.forEach((infoBox, index) => {
                  let selected = document.querySelector(
                      `#hotspot-${index + 1}`);

                  const thumbnailElement = document.createElement("img");
                  thumbnailElement.src = `images/${infoBox.thumbnail}`;



                  const titleElement = document.createElement("h2");
                  titleElement.textContent = infoBox.heading;

                  const textElement = document.createElement("p");
                  textElement.textContent = infoBox.description;



                  selected.appendChild(titleElement);
                  selected.appendChild(textElement);
                  selected.appendChild(thumbnailElement);
              });
          })
          .catch(error => console.error("Error getting info boxes:", error));
  }

  function loadMaterialInfo() {

      //this one is for spinner animation, if i plan to add it on my portfolio make sure to change the materialList class
      materialList.innerHTML = spinner;

      fetch("https://swiftpixel.com/earbud/api/materials")

          .then(response => response.json())

          .then(data => {
              materialList.innerHTML = "";

              data.forEach((material) => {

                  const clone = materialTemplate.content.cloneNode(true);

                  const materialHeading = clone.querySelector(
                      ".material-heading");
                  materialHeading.textContent = material.heading;

                  const materialDescription = clone.querySelector(
                      ".material-description");
                  materialDescription.textContent = material.description;

                  materialList.appendChild(clone);

              });

          })

          .catch(error => console.error("Error getting materials:", error));

  }

  // loads data from api
  loadInfoBoxes();
  loadMaterialInfo();




  function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, {
          autoAlpha: 1
      });
  }

  function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, {
          autoAlpha: 0
      });
  }




  // Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function(hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
  });


})();