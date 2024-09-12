// Array of song objects. Add at least 5 songs with title, artist, and genre properties.
const songs = [
    { title: "Hooked on a Feeling", artist: "Blue Swede", genre: "Pop" },
    { title: "Moonage Daydream", artist: "David Bowie", genre: "Rock" },
    { title: "I Want You Back", artist: "The Jackson 5", genre: "Pop" },
    { title: "Spirit in the Sky", artist: "Norman Greenbaum", genre: "Rock" },
    { title: "Cherry Bomb", artist: "The Runaways", genre: "Rock" },
    { title: "Escape (The Piña Colada Song)", artist: "Rupert Holmes", genre: "Pop" },
    { title: "O-O-H Child", artist: "The Five Stairsteps", genre: "R&B" },
    { title: "Ain't No Mountain High Enough", artist: "Marvin Gaye & Tammi Terrell", genre: "R&B" },
    { title: "Come and Get Your Love", artist: "Redbone", genre: "Rock" },
    { title: "I'm Not in Love", artist: "10cc", genre: "Pop" },
    { title: "Fooled Around and Fell in Love", artist: "Elvin Bishop", genre: "Rock" },
    { title: "The Hum", artist: "Dimitri Vegas", genre: "EDM" },
    { title: "Faded", artist: "Alan Walker", genre: "EDM" },
    { title: "This is what it feels like", artist: "Armin van Buuren", genre: "EDM" },
    { title: "Alone", artist: "Marshmello", genre: "EDM" },
    { title: "Riptide", artist: "Vance Joy", genre: "Indie" },
    { title: "Castle on the hill", artist: "Ed Sheeran", genre: "Indie" },
    { title: "The Cave", artist: "Mumford & Sons", genre: "Indie" },
    { title: "Yellow", artist: "Coldplay", genre: "Indie" },
    // Feel free to add even more songs
];


// Object containing each Guardian's preferred genre
const guardians = {
    "Star-Lord": "Rock",
    "Gamora": "Pop",
    "Drax": "EDM",
    "Rocket": "R&B",
    "Groot": "Indie"
    // Add preferences for Drax, Rocket, and Groot
};

// Function to generate playlist based on preferred genre
function generatePlaylist(guardians, songs) {
    // Use the map() function to create playlists for each Guardian
    // Your code here

    //convert guardians object into an array to use .map function [name, genre]
    const guardiansPlaylist = Object.entries(guardians);

    //use map on the array for the guardians to create the playlist for the individual guardian
    const playlists = guardiansPlaylist.map(([guardian, genre]) => {
        const playlist = songs
            .filter(song => song.genre === genre) //filters for the song to make an exact match of the preferred genre
            .map(song => `${song.title} by ${song.artist}`); //format the song to present as title by artist (like in the solution). NB: must use backticks!

    //return, the guardian and the playlist in the form of an array for const playlists
    return {
        guardian,
        playlist
    }
    });

    //convert the playlists array back to an object using reduce, creating accumulator object with the key being the guardian name and the value being their playlist
    return playlists.reduce((accumulator, {guardian, playlist}) => {
        accumulator[guardian] = playlist;
        return accumulator;
    }, {});//ask why you need the blank {}?
}

//create a function to show the playlists for each character on the webpage
//fetch the HTML element
function showPlaylists(playlists){
    const htmlPlaylists = document.getElementById("playlists");//DOM manipulate the HTML playlists (get the #playlists element from html)
    htmlPlaylists.innerHTML = ""; //clear all existing content

 //create html elements for each guardian and their playlist
 for (const guardian in playlists) {
    // Create a container for the playlist
    const playlistContainer = document.createElement("div");
    playlistContainer.className = "playlist"; // Apply the playlist class

    // Create a heading for the guardian's name
    const heading = document.createElement("h2");
    heading.textContent = guardian;
    playlistContainer.appendChild(heading);

    // Create a list for the songs
    const songList = document.createElement("ul");

    playlists[guardian].forEach(song => {
        // Create a list item for each song
        const listItem = document.createElement("li");
        listItem.className = "song";

        // Create a span for the song title, to link to the CSS styling used for each song listed
        const songTitle = document.createElement("span");
        songTitle.className = "song-title";
        songTitle.textContent = song;

        // Add the song title to the list item
        listItem.appendChild(songTitle);
        songList.appendChild(listItem);
    });

    // Add the song list to the playlist container
    playlistContainer.appendChild(songList);

    // Add the playlist container to the #playlists div
    htmlPlaylists.appendChild(playlistContainer);
}
}

// Call generatePlaylist and display the playlists for each Guardian
const playlists = generatePlaylist(guardians, songs);
showPlaylists(playlists);