const eventsDiv = document.getElementById("events");
const awardssDiv = document.getElementById("awards");
const pubsDiv = document.getElementById("pubs");

const dataElements = [eventsDiv, awardssDiv, pubsDiv];

const cBtns = document.querySelectorAll(".c-btns");

function makeInactive(e) {
	cBtns.forEach((x) => {
    if (x == e) {
      x.classList.add('active');
      return;
    }
		x.classList.remove('active');
	});
}

function toggleVisible(idx) {
  dataElements.forEach((x, i) => {
    if (i == idx) {
      x.style.display = "block";
      return;
    }
    x.style.display = "none";
  });
}

function onEventsClicked(e) {
  makeInactive(e);
  toggleVisible(0);
}

function onAwardsClicked(e) {
  makeInactive(e);
  toggleVisible(1);
}

function onPubsClicked(e) {
  makeInactive(e);
  toggleVisible(2);
}
