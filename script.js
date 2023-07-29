document.addEventListener("DOMContentLoaded", function () {
    // Define the graph representing the house and its rooms
    var houseGraph = {
        'Living Room': {
            description: 'You find yourself in the Living Room. It looks dusty and old.',
            options: ['Kitchen', 'Bedroom']
        },
        'Kitchen': {
            description: 'You enter the Kitchen. There is an eerie silence.',
            options: ['Living Room']
        },
        'Bedroom': {
            description: 'You step into the Bedroom. The air feels heavy.',
            options: ['Living Room', 'Bathroom', 'Secret Room']
        },
        'Bathroom': {
            description: 'You cautiously enter the Bathroom. The faucet drips.',
            options: ['Bedroom']
        },
        'Secret Room': {
            description: 'You discover a Secret Room! A glimmering treasure chest awaits you.',
            options: []
        }
    };

    // Current position of the player
    var currentRoom = 'Living Room';
    var foundTreasure = false;

    // Function to display current room and available options
    function displayRoom() {
        var roomDescription = houseGraph[currentRoom].description;
        var roomOptions = houseGraph[currentRoom].options;

        document.getElementById('room-description').innerText = roomDescription;

        var optionsList = document.getElementById('room-options');
        optionsList.innerHTML = '';

        roomOptions.forEach(function (room) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.href = '#';
            link.innerText = room;
            link.dataset.room = room;
            listItem.appendChild(link);
            optionsList.appendChild(listItem);
        });

        if (foundTreasure) {
            document.getElementById('message-box').innerText = 'Congratulations! You found the hidden treasure!\nYou win!';
        } else {
            document.getElementById('message-box').innerText = '';
        }
    }

    // Function to move to a different room
    function moveToRoom(room) {
        if (houseGraph[currentRoom].options.includes(room)) {
            currentRoom = room;
            displayRoom();

            if (currentRoom === 'Secret Room') {
                foundTreasure = true;
            }
        } else {
            document.getElementById('message-box').innerText = `You can't move to ${room}. Try a different room.`;
        }
    }

    // Initial display
    displayRoom();

    // Event listener for room links
    document.getElementById('room-options').addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            var room = event.target.dataset.room;
            moveToRoom(room);
        }
    });
});
