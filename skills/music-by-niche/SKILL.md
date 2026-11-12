---
name: music-by-niche
description: >-
  Load before choosing background music for a video, reel, story or ad for a business or a client: "pick music for this video", "soundtrack", "background track", "the same song again", "the audio is too loud", "música para el video", "música de spa", "la misma canción", "el audio está duro". It picks the track by the client's niche with common sense (spa or lounge for a beauty salon, percussion for construction, steady industrial for gas and installations, playful for kids' schools, hip-hop for a barbershop), never repeats a track for the same client and never gives two clients the same track within 3 weeks, uses only sources whose license allows paid ads, keeps a usage log, and checks loudness on the final video. Not for composing music and not for cutting the edit to the beat (use a beat-sync editing skill).
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

1. Candidates = tracks whose style is in the niche's list.
2. Drop every track this client has ever used.
3. Drop every track any client used this week or the 2 weeks before or after.
4. Prefer the niche's first style, then the least-used track overall.
5. Nothing left? **Stop and add tracks for that niche.** Do not repeat, and do not borrow a style from an unrelated niche.

Automate steps 1-5 in a small script with tests for each rule. A human picking "a track I like" is how the same song ends up in every video.

## 4. Only sources that allow paid ads

- Use a royalty-free library whose license explicitly allows commercial use in advertising (for example Mixkit's free music license, or a paid library you hold a license for). Read the license page before the first use and note which license each track came under.
- Never YouTube rips, streaming services, TikTok sounds or commercial songs: paid ads with them get muted, rejected or claimed.
- Prefer instrumentals. Vocals fight with on-screen text and voice-over.

## 5. Before delivery

- Start the music at the measured start second, and cut to its beat.
- **Loudness on the final export**, not on the raw track: pick one target and keep it for every video (for example an average RMS around 0.08-0.10 on a 0-1 scale, or about -14 LUFS integrated for social). Louder than the target sounds "hard" on phones.
- With voice-over, duck the music under the voice.
- Report: track, niche, source license, and that it came from the picker.

## Limits

- It does not judge taste. Listen to every new track once before it enters the library.
- BPM detection can double or halve the real tempo on soft tracks; check by ear when the cut feels off.
