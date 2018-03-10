function ShuffleDeck(deck, bookmark) {
    var deck_size = deck.length;
    //alert(deck_size);
    for (var i = 0; i < deck_size; i++) {
        var randnum = Math.floor(Math.random() * deck_size)
        var temp = deck[i];
        deck[i] = deck[randnum];
        deck[randnum] = temp;
    }
    bookmark.value = 0;
}

function CheckBookmark(deck, bookmark) {
    if (bookmark.value < 0 || bookmark.value >= deck.length) {
        ShuffleDeck(deck, bookmark);
    }
}

function CheckDifficulty() {
    var dropdown = document.getElementById("difficulty_dropdown");
    var max_difficulty = dropdown.options[dropdown.selectedIndex].value;

    difficulty = green_deck[green_bookmark.value][2];

    if (difficulty > max_difficulty) {
        return false;
    } else {
        return true;
    }
}

function CheckJob() {
    job = green_deck[green_bookmark.value][1];

    if (job == "Actor" || job == "Actress") {
        if (document.getElementById('actors').checked) {
            return true;
        }
    } else if (job == "Director") {
        if (document.getElementById('directors').checked) {
            return true;
        }
    } else {
        if (document.getElementById('crew').checked) {
            return true;
        }
    }

    return false;
}

function CheckCategory() {
    var dropdown = document.getElementById("category_dropdown");
    var cat_mode = dropdown.options[dropdown.selectedIndex].value;

    if (cat_mode == 0) {
        return true;
    }

    card_cat = white_deck[white_bookmark.value][1];

    if (card_cat == cat_mode) {
        return true;
    }

    return false;
}

function NewCard(deck, bookmark, card_num) {
    CheckBookmark(deck, bookmark);

    var card_text = "";

    if (deck == green_deck) {
        var dropdown = document.getElementById("number_dropdown");
        var name_count = dropdown.options[dropdown.selectedIndex].value;
        
        // Gather names from the green deck that match the selected difficulty and job.
        for(var i = 0; i < name_count; i++){
            while (!CheckDifficulty() || !CheckJob()) {
                bookmark.value++;
                CheckBookmark(deck, bookmark);
            }

            if (i == 0) {
                card_text = deck[bookmark.value][0];
            } else if (name_count > 1 && i == name_count - 1) {
                card_text = card_text + " or " + deck[bookmark.value][0];
            } else {
                card_text = card_text + ", " + deck[bookmark.value][0];
            }
            bookmark.value++;
        }
    } else if (deck == blue_deck) {
        // For the blue deck, just draw the next card.
        card_text = deck[bookmark.value];
        bookmark.value++;
    } else {
        // For the white deck, the first card may need to match a category.
        if(card_num == 1){
            while (!CheckCategory()) {
                bookmark.value++;
                CheckBookmark(deck, bookmark);
            }
        }
        card_text = deck[bookmark.value][0];
        bookmark.value++;
    }

    return card_text;
}

function DrawCard(element_id, card_num) {

    // Check which mode we are in
    var dropdown = document.getElementById("mode_dropdown");
    var mode = dropdown.options[dropdown.selectedIndex].value;

    if (mode == 3) {
        // Handle one of each
        if (card_num == 2) {
            mode = 2;
        } else {
            mode = 1;
        }
    } else if (mode == 4) {
        // Handle random draw
        mode = Math.floor(Math.random() * 2) + 1;
    }

    card_text = "";
    if (mode == 1) {
        // Draw from the white deck
        card_text = NewCard(white_deck, white_bookmark, card_num);
    } else if (mode == 2) {
        var dropdown = document.getElementById("difficulty_dropdown");
        var difficulty = dropdown.options[dropdown.selectedIndex].value;

        if (difficulty == 0) {
            // Draw from the blue deck
            card_text = NewCard(blue_deck, blue_bookmark, card_num);
        } else {
            // Draw from the green deck
            card_text = NewCard(green_deck, green_bookmark, card_num);
        }
    }

    full_text = "Card " + card_num + ": " + card_text;
    document.getElementById(element_id).innerHTML = full_text;
}

function DrawExtra() {
    document.getElementById("card3").style.display = "block";
    DrawCard("card3", 3);
}

function DrawCards() {
    document.getElementById("card3").style.display = "none";
    DrawCard("card1", 1);
    DrawCard("card2", 2);
}

function ModeChange() {
    var dropdown = document.getElementById("mode_dropdown");
    var mode = dropdown.options[dropdown.selectedIndex].value;

    var name_stuff = document.getElementById("name_related_stuff");

    if (mode == 1) {
        name_stuff.style.visibility = "hidden"
    } else {
        name_stuff.style.visibility = "visible"
    }
}

function DifficultyChange() {
    var dropdown = document.getElementById("difficulty_dropdown");
    var difficulty = dropdown.options[dropdown.selectedIndex].value;

    var num_and_job = document.getElementById("number_and_job");

    if (difficulty == 0) {
        num_and_job.style.visibility = "hidden"
    } else {
        num_and_job.style.visibility = "visible"
    }
}