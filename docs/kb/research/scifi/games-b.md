# Sci-fi design languages: games B (research notes)

Date: 2026-10-11. Data file: `junkyard/scifi-design-languages/data/worlds/games-b.ts`.

Method: image lists from the Wikipedia REST media-list API (`/api/rest_v1/page/media-list/<Title>`); every still URL checked with curl for HTTP 200 and an `image/` content type. The API rate-limits parallel agents ("too many requests"); a retry loop with 8 s back-off and a contact User-Agent fixed it. Facts are from memory plus Wikipedia captions; nothing below was web-verified beyond the image lists.

## Wipeout (`wipeout`)
- Sources: en.wikipedia.org/wiki/Wipeout_(video_game), /Wipeout_(video_game_series).
- Stills used: PSX_Wipeout.png (HUD), Wipeout_gameplay_2.jpg (Wipeout HD).
- Rejected: WipEoutCover.jpg (cover, better options), WipEout_poster_(1995).jpg (ad photo of a person), Wipeout_logo.png (logo).
- Unsure: Akira as an influence is a common attribution, not sourced. Team list (Piranha, Goteki 45) is from later games. Year range ends at Wipeout 2048 (2012), Omega Collection (2017) ignored.

## Final Fantasy VII (`final-fantasy-vii`)
- Sources: /Final_Fantasy_VII, /Final_Fantasy_VII_Remake.
- Stills used: FF7_background.gif (Midgar pre-rendered), FFVIIbattleexample.png, Final_Fantasy_VII_Remake_gameplay_screenshot.png.
- Rejected: box art, Nomura cast art, people photos (Sakaguchi, Kitase, Uematsu, Toriyama, Hamauzu), Aerith cutscene (spoiler, not design), concert photo, Intergrade comparison.
- Unsure: Yusuke Naora credited as art director from memory (left in, fairly confident).

## Fallout (`fallout`)
- Sources: /Fallout_(video_game), /Fallout_(franchise).
- Stills used: PipBoyIV.jpg (Commons), Bloody_Mess.jpg, PAX_08_(2837169733).jpg (T-45 replica).
- Rejected: logos and faction flags (Vault-Tec, Nuka-Cola, NCR, Enclave, Legion, Institute), developer photos, promo banners and booth photos, Fallout_1_Dialogue.jpg (verified but weaker), Fallout_camera_angles.png (POV-Ray render, not the game).
- Unsure: Istvan Pely as art lead on Fallout 3 and 4 (moderately confident). Influence list (Forbidden Planet, A Boy and His Dog) is common critical attribution.

## System Shock (`system-shock`)
- Sources: /System_Shock, /System_Shock_(2023_video_game).
- Stills used: SHOCK001.GIF, Ss_cyberspace.GIF.
- Rejected: original and remake covers. The 2023 article has only a cover, so remake visuals are described in text only.
- Unsure: Stephen Kick named for Nightdive (company head, not credited art director).

## StarCraft (`starcraft`)
- Sources: /StarCraft_(video_game).
- Stills used: Zerg_colony_(StarCraft).png, Briefing_room_(StarCraft).png.
- Rejected: box art, StarCraft_64_screenshot.jpg (port, lower res).
- Unsure: James Phinney as lead designer (fairly confident). Influences (Starship Troopers novel, Warhammer 40,000) are common attributions.

## Elite Dangerous (`elite-dangerous`)
- Sources: /Elite_Dangerous.
- Stills used: Elite-Dangerous-Orbital-Station.jpg only.
- Rejected: Elite_Dangerous.png (it is the logo, checked visually), Elite_Dangerous_Holo-Me.jpg (character creator, not the design language).
- Weak: no cockpit or HUD still available on Wikipedia; the plate carries the cockpit.
- Left out: art director names (not confident).

## Alien: Isolation (`alien-isolation`)
- Sources: /Alien:_Isolation.
- Stills used: Alien_Isolation_Art_Exterior.jpg, Alien_Isolation_Art_Interior.jpg, Alien_isolation_screenshot.jpg.
- Rejected: cover.
- Unsure: the VHS recording detail for CRT artifacts is from developer interviews as remembered; kept as widely reported.

## Killzone (`killzone`)
- Sources: /Killzone, /Killzone_(video_game), /Killzone_2, /Killzone_3, /Killzone_Shadow_Fall, /Killzone:_Mercenary.
- Stills used: E3_2013_Killzone.jpg (Commons, Helghast costume, checked visually), Killzone_3_Screenshot.jpg.
- Substitution: the 2004 and series articles have only a logo, cover and the E3 photo, so a Killzone 3 screenshot stands in for gameplay.
- Rejected: KILLZONE.svg (logo), covers, Killzone_2_E32007.jpg (not inspected), Killzone_Mercenary_screenshot.jpg (Vita HUD, weaker).
- Unsure: Jan-Bart van Beek as art director and Mathijs de Jonge as game director (fairly confident). Dropped "Saving Private Ryan" and "Dune" as influences (unsourced).

## Doom 2016 (`doom-2016`)
- Sources: /Doom_(2016_video_game).
- Stills used: Screenshot_for_Doom_2016.jpg, Doom_Cover.jpg.
- Rejected: developer photos, reversible cover (cover duplicate).
- Unsure: "Hellraiser" influence is a reasonable attribution, not sourced.

## No Man's Sky (`no-mans-sky`)
- Sources: /No_Man%27s_Sky.
- Stills used: No_mans_sky_screenshot.jpg, No_Mans_Sky_Ships.jpg.
- Rejected: cover, Sean Murray photo.
- Unsure: Grant Duncan as art director (confident). Chris Foss and Ralph McQuarrie as cited references (confident on Foss). Dropped an Asimov and Clarke paperback line as too loose.

## Titanfall 2 (`titanfall-2`)
- Sources: /Titanfall_2.
- Stills used: Titanfall_2_gameplay_screenshot.png, Titanfall_2.jpg (cover, shows BT-7274).
- Rejected: Matthew Mercer photo, AH-64D_Apache_Longbow.jpg (real helicopter; cited only in text, from the article caption).
- Unsure: Joel Emslie credited with art direction (moderately confident). Gundam and Patlabor influences are attributions, not sourced.
