let categoryData = [], allAnswersArr = [], fourChoices = [], squadChoice = "____", categoryChoice = "____", score = 0, moneyArray = [100, 150, 325, 610, 830, 1e3, 1250, 1460, 1680, 1800], quiz10 = [], currentQuestion = 0; const quizLength = 9; var timerInterval; $("#score-time-encap").hide(), $("#q-and-a").hide(), $("#game-over-encap").hide(), $("#map-encap").hide(), document.addEventListener("DOMContentLoaded", function () { var a = document.querySelectorAll(".sidenav"), b = M.Sidenav.init(a, {}) }); var collapsibleElem = document.querySelector(".collapsible"), collapsibleInstance = M.Collapsible.init(collapsibleElem, {}); document.addEventListener("DOMContentLoaded", function () { var a = document.querySelectorAll(".dropdown-trigger"), b = M.Dropdown.init(a, { constrainWidth: !1, coverTrigger: !1, alignment: "left", closeOnClick: !1 }) }), $(document).ready(() => { $(".category-btn").on("click", function () { categoryChoice = $(this).data("category"), $("#cat-setting").text(categoryChoice), localStorage.setItem("userChosenCat", categoryChoice), localStorage.setItem("userChosenCatProfile", categoryChoice), playSound("bump"), categoryChosen(categoryChoice) }), localStorage.isAuthenticated || window.location.replace("/login.html"), $("#squad-setting").text(squadChoice), $("#cat-setting").text(categoryChoice), $(".team-choice").on("click", function () { playSound("bump"), squadChoice = $(this).data("squad"), $("#squad-setting").text(squadChoice), localStorage.setItem("userChosenSquad", squadChoice), localStorage.setItem("userChosenSquadProfile", squadChoice) }), $("#play-btn").on("click", function () { "____" === squadChoice || "____" === categoryChoice || (playSound("jump"), startQuiz()) }), $(".answer").on("click", verifyResponse), $("#play-this-again").on("click", function () { "" === $("#initials").val() || (localStorage.setItem("userInits", $("#initials").val()), $(".mapSquare").attr("style", null), $("#game-over-encap").hide(), postScore(), startQuiz()) }), $("#play-new-cat").on("click", function () { categoryChoice = "____", squadChoice = "____", $("#cat-setting").text(categoryChoice), $("#squad-setting").text(squadChoice); "" === $("#initials").val() || (localStorage.setItem("userInits", $("#initials").val()), $(".mapSquare").attr("style", null), $("#game-over-encap").hide(), $("#score-time-encap").hide(), $("#q-and-a").hide(), $("#cat-encap").fadeIn("slow"), postScore()) }), $("#mark-map").on("click", function () { "" === $("#initials").val() || ($("#play-again-map").attr("style", "pointer-events:none; background-color: gray; color: white"), localStorage.setItem("userInits", $("#initials").val()), console.log($("#initials").val()), $("#game-over-encap").hide(), $("#score-time-encap").hide(), $("#map-encap").fadeIn("slow")) }), $(".mapSquare").on("click", function () { let a = $(this).data("id"); playSound("ping"), $("#play-again-map").attr("style", null), $(this).removeClass(), $(this).addClass("mapSquare valign-wrapper no-select"), $(this).addClass(`${squadChoice}`), $(this).text(`${localStorage.userInits}`), $(".mapSquare").attr("style", "pointer-events:none"), postScore(), updateMapSquare({ id: a, color: squadChoice, inits: localStorage.userInits }) }), $("#play-again-map").on("click", function () { $(".mapSquare").attr("style", null), window.location.replace("/play.html"), $("#game-over-encap").hide(), $("#score-time-encap").hide(), $("#q-and-a").hide(), $("#map-encap").hide(), $("#cat-encap").fadeIn("slow") }) }); function categoryChosen(a) { $.get(`/api/questions/category/${a}`, a => { allAnswersArr = [], fourChoices = [], categoryData = []; for (let b = 0; b < a.length; b++)categoryData.push(a[b]); for (let b = 0; b < a.length; b++)allAnswersArr.push(categoryData[b].answer) }) } function shuffle(a) { for (let b, c = a.length - 1; 0 < c; c--)b = Math.floor(Math.random() * (c + 1)), [a[c], a[b]] = [a[b], a[c]]; return a } function verifyResponse() { let a = $(this).text(), b = 0; a === quiz10[currentQuestion].answer ? (score += moneyArray[currentQuestion], $("#cash-display").text(`Cash: $${score}`), $(".answer").attr("style", "pointer-events:none"), $(this).attr("style", "background-color: rgb(104, 226, 56); border-color: black; color: white; box-shadow: 0px 5px 2px rgb(104, 226, 56); pointer-events: none"), playSound("coin")) : ($(".answer").attr("style", "pointer-events:none"), $(this).attr("style", "background-color: red; border-color: black; color: white; box-shadow: 0px 5px 2px red; pointer-events:none"), playSound("dead")), currentQuestion++, b = window.setTimeout(renderQuestion, 600) } function renderQuestion() { if (currentQuestion >= quiz10.length) return currentQuestion = 0, console.log("GAME OVER"), void gameOver(); $(".answer").attr("style", null), fourChoices = []; let a = quiz10[currentQuestion].answer; fourChoices.push(a); let b = 0, c = "", d = "", e = ""; for (; 3 > b;)1 === b || 2 === b ? 1 === b ? (d = allAnswersArr[Math.floor(Math.random() * allAnswersArr.length)], c !== d && a !== d && (fourChoices.push(d), b++)) : (e = allAnswersArr[Math.floor(Math.random() * allAnswersArr.length)], e !== d && e !== c && e !== a && (fourChoices.push(e), b++)) : (c = allAnswersArr[Math.floor(Math.random() * allAnswersArr.length)], c !== a && (fourChoices.push(c), b++)); fourChoices = shuffle(fourChoices), $("#question-display").text(quiz10[currentQuestion].question), $("#answer-1").text(fourChoices[0]), $("#answer-2").text(fourChoices[1]), $("#answer-3").text(fourChoices[2]), $("#answer-4").text(fourChoices[3]) } function startQuiz() { currentQuestion = 0, score = 0, currentTime = 60, localStorage.setItem("userChosenCat", categoryChoice), $("#cash-display").text(`Cash: $${score}`), $("#time-display").text("Time:60"), $("#category-display").text(`${categoryChoice.toUpperCase()}`), $("#cat-encap").hide(), $("#q-and-a").fadeIn("fast"), $("#score-time-encap").fadeIn("fast"), $("#congratulations-msg").addClass("hide"), $("#try-again-msg").addClass("hide"), $("#map-btn").addClass("hide"), setTime(), categoryData = shuffle(categoryData), quiz10 = []; for (let a = 0; 10 > a; a++)quiz10.push(categoryData[a]); renderQuestion() } function setTime() { timerInterval = setInterval(function () { currentTime--, $("#time-display").text(`Time: ${currentTime}`), 0 >= currentTime && (clearInterval(timerInterval), gameOver()), 10 >= currentTime && $("#time-display").attr("style", "color: red") }, 1e3) } function gameOver() { $("#q-and-a").hide(), $("#game-over-encap").fadeIn("slow"), $("#user-score").text(score), localStorage.setItem("finalScore", score), localStorage.setItem("finalScoreProfile", score), clearInterval(timerInterval), 1e3 <= score ? ($("#congratulations-msg").removeClass("hide"), playSound("coin"), $("#map-btn").removeClass("hide")) : (playSound("dead"), $("#try-again-msg").removeClass("hide"), $("#initials").val("---")) } function updateMapSquare(a) { let b = { color: a.color, inits: a.inits }, c = a.id; console.log(b), console.log(c), $.ajax({ method: "PUT", url: "/api/mapsquare/" + c, data: b }).then(a => { console.log(".....after the put request for the squares"), a.json(a) }) } function postScore() { $.post("/api/maps", { email: localStorage.userEmail, squad: localStorage.userChosenSquad, inits: localStorage.userInits, score: localStorage.finalScore, category: localStorage.userChosenCat }).then(a => { console.log(a), localStorage.removeItem("userChosenSquad"), localStorage.removeItem("userChosenCat"), localStorage.removeItem("finalScore") }) } $.get("/api/mapsquare", a => { console.log(a); for (let b = 1; 17 > b; b++)$(`#${b}`).removeClass(), $(`#${b}`).addClass(`mapSquare valign-wrapper no-select ${a[b - 1].color}`), $(`#${b}`).text(`${a[b - 1].inits}`) }); function logout() { localStorage.clear(), window.location.replace("/home.html") } $.get("/api/user/" + localStorage.userEmail, a => { console.log(a), $("#name").text(a.firstName + " " + a.lastName), $("#email").text(a.email); var b = document.getElementById("navPic"); b.src = a.img; var c = document.getElementById("navSidPic"); c.src = a.img }).then(() => { });