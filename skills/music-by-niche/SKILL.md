---
name: music-by-niche
description: >-
  Load before choosing background music for a video, reel, story or ad for a business or a client: "pick music for this video", "soundtrack", "background track", "the same song again", "the audio is too loud", "música para el video", "música de spa", "la misma canción", "el audio está duro". It picks the track by the client's niche with common sense (spa or lounge for a beauty salon, percussion for construction, steady industrial for gas and installations, playful for kids' schools, hip-hop for a barbershop), picks at random among eligible tracks, never repeats a track for the same client or between two clients of the same niche, never gives two clients the same track within 3 weeks, uses only sources whose license allows paid ads with a proof file per track, adds the attribution line to the ad copy for CC-BY music, keeps a usage log, and checks loudness on the final video. Not for composing music and not for cutting the edit to the beat (use a beat-sync editing skill).
license: MIT
---

# Music by niche

Agencies that make many videos for many clients fall into two habits: the same three tracks under every client, or a random track that has nothing to do with the business (club music under a spa ad). Clients notice both. A third problem rides along: music mixed so loud it drowns the message.

One rule: **the track sounds like the client's business, has never been used for that client, has not been used for anyone in the last 3 weeks, and sits under the message, not on top of it.**

## 1. Map the client to a niche

| Business | Niche | Styles, first choice first |
|---|---|---|
| Beauty salon, spa, aesthetics | spa | spa / chillout / lounge → wellness |
| Gas, installations, technical services | gas | steady industrial, minimal techno → corporate |
| Construction, remodeling | construction | percussion, drums, driving → industrial → energetic |
| Cleaning, home services | cleaning | fresh, cheerful → happy |
| Schools, kids, tutoring | school | playful children's → happy |
| Fashion, sportswear, nails | fashion | urban, pop → funk → energetic |
| Supplements, health, wellness | wellness | uplifting, inspiring → emotional |
| Agency, tech, apps | agency | tech, electronic → corporate → funk |
| Video games | gaming | chiptune → playful |
| Barbershop | barber | hip-hop, boom bap → urban |
| Restaurants, food | food | latin, local → happy |

Common sense on top of the table: a spa promo stays soft even when the offer is exciting; a school video aimed at parents is warm, not cartoonish. If a new client fits no row, add one and pick the music its own customers would expect to hear in its shop.

## 2. Keep a library and a usage log

- **Library:** a folder of tracks plus a catalog with `id, title, style, bpm, start_second, duration`. Measure BPM and the best start point (a strong beat in the loudest section) once, when the track is added.
- **Log:** one row per use: `client, week (Monday date), track id, video`.
- Re-running the pick for the same client, week and video must return the same track, so retries never burn a new one.

## 3. Pick the track (in this order)

1. Candidates = tracks whose style is in the niche's list **and** that have a license record (source, license, and credit text if the license requires attribution).
2. Drop every track this client has ever used.
3. Drop every track any **other client in the same niche** has ever used: two beauty salons never share a song, even months apart.
4. Drop every track any client used this week or the 2 weeks before or after.
5. Pick **at random** among what is left in the niche's first style; use the backup styles only when the first is empty. Always taking "the first one" makes every client sound the same.
6. Nothing left? **Stop and add tracks for that niche.** Do not repeat, and do not borrow a style from an unrelated niche.

Automate it in a small script with a test for each rule. A human picking "a track I like" is how the same song ends up in every video.

## 4. Only sources that allow paid ads, with proof per track

Order of preference that worked for the author (licenses read in Nov 2026; re-read them yourself):
1. **Mixkit**: free music license that allows online ads, no attribution. Its terms forbid bots and mass downloads, so you download only the chosen track, one at a time. It does not cover music used inside a video game.
2. **Pixabay Music**: commercial use, no attribution, no robots. Save the license certificate of each track. Some tracks are AI-made and some get claimed by Content ID, so check the author.
3. **Incompetech (Kevin MacLeod)**: CC-BY 4.0 with a public JSON catalog; **attribution required**.
4. **Openverse**: CC0 or CC-BY only, via its public API.
- Platform libraries (Meta Sound Collection, YouTube Audio Library) can only be added inside their own platform. Do not download them for your render.
- **Never:** trending in-app music (personal use only), NC or ND licenses, the "free" tiers of paid libraries, streaming rips, commercial songs. Never register a library track in a rights-management system.

**Proof per track:** date, track URL, license URL, author, license, and the certificate or ISRC if there is one. Store it next to the file. No proof, no use.

**Attribution:** for CC-BY tracks, put the exact credit line in the ad's primary text (Meta ads have no description field). If the credit is missing, the video does not ship.

## 5. Before delivery

- Start the music at the measured start second, and cut to its beat.
- **Loudness on the final export**, not on the raw track: pick one target and keep it for every video (for example an average RMS around 0.08-0.10 on a 0-1 scale, or about -14 LUFS integrated for social). Louder than the target sounds "hard" on phones.
- With voice-over, duck the music under the voice.
- Report: track, niche, source license, and that it came from the picker.

## Limits

- It does not judge taste. Listen to every new track once before it enters the library.
- BPM detection can double or halve the real tempo on soft tracks; check by ear when the cut feels off.
