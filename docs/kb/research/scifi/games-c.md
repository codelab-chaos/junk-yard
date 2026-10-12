# Sci-fi design languages: games batch C

Research notes for `junkyard/scifi-design-languages/data/worlds/games-c.ts`. Compiled 2026-10-11.

Method: image lists from the Wikipedia REST media-list API (`/api/rest_v1/page/media-list/<title>`). Every chosen still was checked with curl for HTTP 200 and an image content type. Portraits of people (actors, directors, composers), studio logos and title logos were rejected throughout, since they do not show the design. The API rate-limited (HTTP 429) at first, so requests were retried with a delay.

## Prey (2017)
- Source: https://en.wikipedia.org/wiki/Prey_(2017_video_game)
- Used: gameplay screenshot (GLOO Cannon), 1933 Chicago World's Fair poster (the article cites it as the Art Deco reference).
- Rejected: cover art (a gameplay image was available); photos of Benedict Wong, Sumalee Montano and Raphaël Colantonio (portraits); JFK motorcade photo (not design).
- Credits: Raphaël Colantonio is creative director, Ricardo Bare is lead designer, Emmanuel Petit is lead visual designer (MobyGames credits). TranStar manufacturer names beyond TranStar were left out.

## Horizon Zero Dawn (2017)
- Source: https://en.wikipedia.org/wiki/Horizon_Zero_Dawn
- Used: gameplay screenshot (Aloy hunting a machine), Remastered lighting comparison.
- Rejected: cover; Guerrilla logo; Ashly Burch and Joris de Man photos.
- Unsure: Jan-Bart van Beek credited as art director. Misja Baas also has art credits but was left out because his role could not be confirmed.

## NieR: Automata (2017)
- Source: https://en.wikipedia.org/wiki/Nier:_Automata
- Used: gameplay (2B vs machines), cover art (250px, the only width offered).
- Rejected: Beauvoir and Sartre photo (not design).
- Left out: the environment art director's name (not confirmed). Plate uses `megacity` for the ruined city, which is a loose fit.

## Control (2019)
- Source: https://en.wikipedia.org/wiki/Control_(video_game)
- Used: gameplay screenshot, ray-tracing comparison, 33 Thomas Street photo (the article cites it as the Oldest House reference).
- Rejected: cover (three better images); Sam Lake portrait.
- Unsure: Janne Pulkkinen as art director (fairly confident). The UI typeface was not named because the source could not be confirmed.

## Death Stranding (2019)
- Source: https://en.wikipedia.org/wiki/Death_Stranding
- Used: E3 2018 pre-release gameplay screenshot (Odradek scan), cover (250px).
- Rejected: Norman Reedus, Léa Seydoux and Mads Mikkelsen portraits; E3 2018 photo.
- Unsure: Errolson Hugh (ACRONYM) costume collaboration, from memory and not checked against the article. The Iceland scan basis is widely reported.

## Outer Wilds (2019)
- Source: https://en.wikipedia.org/wiki/Outer_Wilds
- Used: Nomai translator screenshot, in-game solar system map (webp), Steam key art (250px).
- Rejected: Alex Beachum portrait.
- Left out: the art director's name (not confirmed).

## Signalis (2022)
- Source: https://en.wikipedia.org/wiki/Signalis
- Used: gameplay screenshot (250px thumb as returned; an unscaled original also exists), cover.
- Weak: only two images exist and the gameplay thumb is small.
- Unsure: the plate glyph "LSTR-512" is styled after Replika model codes and is not an exact in-game string. The Eastern Bloc and German-signage reading follows common critical description.

## Starfield (2023)
- Source: https://en.wikipedia.org/wiki/Starfield_(video_game)
- Used: Abandoned Hangar, Empty planet, cover (all Commons, 500px).
- Unsure: Istvan Pely as art director (fairly confident). The ship manufacturer names (Stroud-Eklund, Hopetech, Deimos, Nova Galactic) are from memory.

## Returnal (2021)
- Source: https://en.wikipedia.org/wiki/Returnal
- Used: pre-release gameplay gif, cover (250px).
- Weak: only two images exist. The gif is low detail.
- Unsure: the influences (Alien, Giger, Lovecraft) are a critical reading, not studio-confirmed. The biome names are from memory.

## Hyper Light Drifter (2016)
- Source: https://en.wikipedia.org/wiki/Hyper_Light_Drifter
- Used: pictographic dialogue screenshot, box art (250px).
- Rejected: Heart Machine GDC 2017 group photo (people).
- Unsure: the influences listed (A Link to the Past, Nausicaä, Diablo) are widely cited. Other artists on the team were left out.

## Rain World (2017)
- Source: https://en.wikipedia.org/wiki/Rain_World
- Used: Green Lizard animation gif, Blue Lizard animation gif, Downpour promotional art.
- Rejected: two logo images (Steam logo, logo-center promo); Mimic gif (only the unscaled original was offered, and it is redundant).
- Note: the stills are gifs of creatures in ruins. They show the ecology but little of the wider industrial vistas. The Downpour art is from the 2023 expansion, not the 2017 base game.
