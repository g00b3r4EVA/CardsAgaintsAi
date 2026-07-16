import React, { useState, useEffect, useRef } from 'react';
import { Crown, User, Bot, Trophy, ArrowRight, Settings, CheckCircle2, Flame, Smile, Loader2, ChevronUp, ChevronDown, Sparkles, Library, Trash2, Plus, ArrowLeft, Filter } from 'lucide-react';

// --- MASSIVE CARD DATABASE ---
// Tags: family, gross, body, school, absurd, action, secret, nerdy, sad, bad, animals, food,
//       nsfw, sex, dark, violence, politics, religion, pop-culture, scary

const FRIENDLY_BLACK_CARDS = [
  { text: "I got sent to the principal's office for ___.", tags: ['school', 'bad', 'absurd', 'action'] },
  { text: "What are my parents hiding from me?", tags: ['secret', 'absurd', 'family'] },
  { text: "The new school rule is no ___.", tags: ['school', 'absurd', 'action'] },
  { text: "What's hiding under my bed?", tags: ['scary', 'absurd', 'animals'] },
  { text: "My secret superpower is ___.", tags: ['action', 'absurd', 'nerdy', 'secret'] },
  { text: "What did I bring to show and tell?", tags: ['school', 'gross', 'absurd', 'nerdy'] },
  { text: "Mom's hiding ___ in the pantry.", tags: ['secret', 'gross', 'food', 'family'] },
  { text: "What ruined the field trip?", tags: ['school', 'bad', 'gross', 'sad'] },
  { text: "Instead of a dog, we are getting a pet ___.", tags: ['absurd', 'action', 'animals'] },
  { text: "Why am I crying?", tags: ['sad', 'bad', 'school', 'body'] },
  { text: "My favorite new video game is Simulator: ___.", tags: ['nerdy', 'absurd', 'action'] },
  { text: "What's the best way to get out of doing homework?", tags: ['school', 'bad', 'secret', 'absurd'] },
  { text: "I'm going to dress up as ___ for Halloween.", tags: ['scary', 'absurd', 'pop-culture', 'nerdy'] },
  { text: "What is my dog thinking about right now?", tags: ['animals', 'food', 'absurd'] },
  { text: "My imaginary friend is ___.", tags: ['secret', 'scary', 'absurd', 'nerdy'] },
  { text: "If I was president, I would outlaw ___.", tags: ['politics', 'bad', 'school', 'absurd'] },
  { text: "Dad's new hobby is ___.", tags: ['family', 'absurd', 'gross', 'action'] },
  { text: "The new cafeteria food tastes mysteriously like ___.", tags: ['food', 'gross', 'school', 'absurd'] },
  { text: "I wish I could trade my little brother for ___.", tags: ['family', 'bad', 'absurd'] },
  { text: "What did the teacher find in my backpack?", tags: ['school', 'secret', 'bad'] },
  { text: "My favorite weekend activity is ___.", tags: ['family', 'action', 'absurd'] },
  { text: "If I had a million dollars, I'd buy ___.", tags: ['absurd', 'action', 'pop-culture'] },
  { text: "The tooth fairy left me ___ instead of money.", tags: ['family', 'absurd', 'gross'] },
  { text: "I got grounded for a week because of ___.", tags: ['family', 'bad', 'action'] },
  { text: "What do penguins do for fun?", tags: ['animals', 'absurd', 'action'] },
  { text: "My mom’s actual superpower is ___.", tags: ['family', 'action', 'secret'] },
  { text: "My favorite thing to do at recess is ___.", tags: ['school', 'action', 'family'] },
  { text: "If I could only eat one food forever, it would be ___.", tags: ['food', 'absurd'] },
  { text: "The teacher told my parents that I am too ___.", tags: ['school', 'bad', 'family'] },
  { text: "Why is the dog barking?", tags: ['animals', 'scary', 'absurd'] },
  { text: "What's the best part of waking up?", tags: ['food', 'family', 'action'] },
  { text: "My dream vacation involves ___.", tags: ['family', 'action', 'absurd'] },
  { text: "What is the most boring thing in the world?", tags: ['school', 'sad', 'nerdy'] },
  { text: "If animals could talk, what would the cat say?", tags: ['animals', 'absurd', 'bad'] },
  { text: "What's the secret to a happy life?", tags: ['family', 'absurd', 'nerdy'] },
  { text: "What did I forget to pack for the camping trip?", tags: ['family', 'bad', 'scary'] },
  { text: "The best Halloween candy is obviously ___.", tags: ['food', 'scary', 'pop-culture'] },
  { text: "I'm opening a restaurant that only serves ___.", tags: ['food', 'gross', 'absurd'] },
  { text: "What is the actual moon made out of?", tags: ['nerdy', 'food', 'absurd'] },
  { text: "Why did the chicken cross the road?", tags: ['animals', 'absurd', 'action'] },
  { text: "What makes me feel like a superhero?", tags: ['action', 'nerdy', 'body'] }
];

const MEH_BLACK_CARDS = [
  { text: "What's that smell?", tags: ['gross', 'body', 'food', 'family'] },
  { text: "Why am I sticky?", tags: ['gross', 'body', 'food'] },
  { text: "The worst thing to find in your lunchbox is ___.", tags: ['food', 'gross', 'school', 'sad'] },
  { text: "Why can't I sleep at night?", tags: ['scary', 'sad', 'dark', 'secret'] },
  { text: "What's that sound?", tags: ['scary', 'gross'] },
  { text: "White people like ___.", tags: ['absurd', 'sad', 'bad', 'politics'] },
  { text: "What's the new diet craze?", tags: ['gross', 'absurd', 'body', 'food'] },
  { text: "I drink to forget ___.", tags: ['sad', 'dark', 'secret'] },
  { text: "What is the worst thing to say at a funeral?", tags: ['dark', 'sad', 'bad', 'absurd'] },
  { text: "What did the US government hide from the public?", tags: ['politics', 'secret', 'dark'] },
  { text: "If you want a picture of the future, imagine a boot stamping on ___.", tags: ['dark', 'politics', 'violence', 'absurd'] },
  { text: "My doctor told me I need to stop ___.", tags: ['body', 'bad', 'sad'] },
  { text: "What’s the worst thing to find in your shoe?", tags: ['gross', 'scary', 'animals'] },
  { text: "I got fired from my job for ___.", tags: ['bad', 'action', 'secret', 'sad'] },
  { text: "What’s the most disappointing birthday present?", tags: ['sad', 'family', 'bad'] },
  { text: "My new roommate is dangerously obsessed with ___.", tags: ['scary', 'absurd', 'secret'] },
  { text: "What’s making that weird noise in the basement?", tags: ['scary', 'dark', 'animals'] },
  { text: "I’m writing a self-help book about ___.", tags: ['sad', 'bad', 'nerdy'] },
  { text: "My dating profile highlights my passion for ___.", tags: ['secret', 'sad', 'absurd'] },
  { text: "I always carry ___ in my purse just in case.", tags: ['secret', 'absurd', 'gross'] },
  { text: "What’s the absolute worst thing to say on a first date?", tags: ['bad', 'sad', 'secret'] },
  { text: "My dating life can be best described as ___.", tags: ['sad', 'bad', 'dark'] },
  { text: "What's the worst thing to find in the microwave?", tags: ['gross', 'food', 'scary'] },
  { text: "I’m sorry I missed your call, I was busy ___.", tags: ['secret', 'action', 'bad'] },
  { text: "The newest TikTok trend is just ___.", tags: ['pop-culture', 'absurd', 'bad'] },
  { text: "Why am I always tired?", tags: ['sad', 'body', 'dark'] },
  { text: "What's the most useless major in college?", tags: ['school', 'nerdy', 'sad'] },
  { text: "I'm considering starting a podcast about ___.", tags: ['nerdy', 'sad', 'absurd'] },
  { text: "What ruined the family reunion?", tags: ['family', 'bad', 'gross', 'dark'] },
  { text: "The worst part of growing up is ___.", tags: ['sad', 'dark', 'family'] },
  { text: "What's a surefire way to get out of a speeding ticket?", tags: ['action', 'bad', 'secret'] },
  { text: "Instead of a midlife crisis, I had a ___.", tags: ['sad', 'absurd', 'dark'] },
  { text: "What's the most annoying sound in the world?", tags: ['gross', 'body', 'bad'] },
  { text: "My boss just implemented a new policy strictly forbidding ___.", tags: ['bad', 'school', 'action'] },
  { text: "What's my biggest regret?", tags: ['sad', 'dark', 'secret'] },
  { text: "What makes me irrationally angry?", tags: ['bad', 'sad', 'absurd'] }
];

const NSFW_BLACK_CARDS = [
  { text: "What ended my last relationship?", tags: ['sad', 'sex', 'dark', 'secret', 'nsfw'] },
  { text: "Instead of coal, Santa now gives the bad children ___.", tags: ['dark', 'absurd', 'gross', 'nsfw'] },
  { text: "What is Batman's guilty pleasure?", tags: ['nerdy', 'sex', 'absurd', 'secret', 'nsfw'] },
  { text: "During sex, I like to think about ___.", tags: ['sex', 'absurd', 'dark', 'gross', 'nsfw'] },
  { text: "What am I giving up for Lent?", tags: ['sex', 'bad', 'gross', 'dark', 'religion'] },
  { text: "What's my secret power?", tags: ['action', 'sex', 'dark', 'nerdy', 'nsfw'] },
  { text: "Daddy, why is mommy crying?", tags: ['sad', 'dark', 'sex', 'violence'] },
  { text: "In L.A. County Jail, word is you can trade 200 cigarettes for ___.", tags: ['dark', 'sex', 'action', 'nsfw'] },
  { text: "Next from J.K. Rowling: Harry Potter and the Chamber of ___.", tags: ['nerdy', 'sex', 'absurd', 'nsfw'] },
  { text: "My therapist says I have an unhealthy obsession with ___.", tags: ['sad', 'dark', 'sex', 'nsfw'] },
  { text: "The new Tinder update lets you filter by ___.", tags: ['sex', 'absurd', 'body', 'nsfw'] },
  { text: "My sexual awakening was caused by ___.", tags: ['sex', 'nerdy', 'pop-culture', 'nsfw'] },
  { text: "What’s my safeword?", tags: ['sex', 'nsfw', 'absurd'] },
  { text: "My weirdest kink is ___.", tags: ['sex', 'nsfw', 'gross', 'weird'] },
  { text: "What did the stripper leave behind in my living room?", tags: ['sex', 'nsfw', 'secret', 'gross'] },
  { text: "I accidentally sent my boss a picture of ___.", tags: ['nsfw', 'bad', 'secret', 'body'] },
  { text: "What ruins a perfectly good orgy?", tags: ['sex', 'nsfw', 'gross', 'sad'] },
  { text: "The best cure for a hangover is a healthy dose of ___.", tags: ['gross', 'dark', 'body', 'nsfw'] },
  { text: "My browser history is mostly just ___.", tags: ['secret', 'nsfw', 'nerdy', 'sad'] },
  { text: "What’s the worst thing to find in a cheap motel bed?", tags: ['gross', 'nsfw', 'body', 'scary'] },
  { text: "I got permanently banned from the strip club for ___.", tags: ['nsfw', 'bad', 'action', 'dark'] },
  { text: "The newest high-tech adult toy features ___.", tags: ['nsfw', 'nerdy', 'absurd', 'action'] },
  { text: "What's my secret weapon in bed?", tags: ['sex', 'nsfw', 'body', 'action'] },
  { text: "The real reason I got a divorce was ___.", tags: ['sad', 'sex', 'dark', 'secret'] },
  { text: "What's the worst thing to bring to a nude beach?", tags: ['body', 'gross', 'nsfw', 'bad'] },
  { text: "My safe word is ___.", tags: ['sex', 'nsfw', 'absurd', 'action'] },
  { text: "What's the kinkiest thing I've ever done?", tags: ['sex', 'nsfw', 'secret', 'dark'] },
  { text: "I was banned from the petting zoo because of ___.", tags: ['animals', 'gross', 'nsfw', 'bad'] },
  { text: "What's the best way to spice up a marriage?", tags: ['sex', 'nsfw', 'family', 'absurd'] },
  { text: "What did I find in my partner's nightstand?", tags: ['secret', 'sex', 'nsfw', 'gross'] },
  { text: "My ultimate fantasy involves ___.", tags: ['sex', 'nsfw', 'absurd', 'action'] },
  { text: "What's the most inappropriate time to pop an erection?", tags: ['body', 'nsfw', 'bad', 'sad'] },
  { text: "What is Satan's favorite pastime?", tags: ['dark', 'religion', 'nsfw', 'violence'] },
  { text: "Why do I go to therapy?", tags: ['sad', 'dark', 'sex', 'nsfw'] },
  { text: "What's the worst thing to accidentally send to your mom?", tags: ['family', 'nsfw', 'sex', 'secret'] },
  { text: "What is my go-to move at the club?", tags: ['action', 'sex', 'nsfw', 'body'] },
  { text: "What's the most surprising thing I've put in my mouth?", tags: ['body', 'gross', 'food', 'nsfw'] }
];

const FRIENDLY_WHITE_CARDS = [
  { text: "Screaming into a pillow.", tags: ['sad', 'bad', 'absurd', 'action'] },
  { text: "A bear that knows karate.", tags: ['action', 'absurd', 'scary', 'animals'] },
  { text: "Getting slapped with a fish.", tags: ['absurd', 'gross', 'action', 'animals'] },
  { text: "Boogers.", tags: ['gross', 'body'] },
  { text: "Homework.", tags: ['school', 'sad', 'bad'] },
  { text: "A dead bug.", tags: ['gross', 'scary', 'animals'] },
  { text: "Grandma's dentures.", tags: ['gross', 'absurd', 'body', 'family'] },
  { text: "Forgetting to wear pants.", tags: ['school', 'bad', 'body', 'secret'] },
  { text: "Biting the dentist.", tags: ['action', 'bad', 'gross'] },
  { text: "Eating a whole stick of butter.", tags: ['gross', 'absurd', 'food'] },
  { text: "Tripping and dropping my lunch.", tags: ['school', 'sad', 'bad', 'food'] },
  { text: "A flock of angry geese.", tags: ['animals', 'scary', 'action'] },
  { text: "Spelling words wrong on purpose.", tags: ['school', 'bad', 'nerdy'] },
  { text: "A hot dog with ketchup, mustard, and mayonnaise.", tags: ['food', 'gross', 'absurd'] },
  { text: "Running with scissors.", tags: ['bad', 'action', 'school'] },
  { text: "A very confused pigeon.", tags: ['animals', 'absurd'] },
  { text: "Stealing cookies before dinner.", tags: ['food', 'bad', 'secret', 'family'] },
  { text: "My little brother.", tags: ['family', 'gross', 'sad'] },
  { text: "A weird smell coming from the fridge.", tags: ['food', 'gross', 'secret'] },
  { text: "Being grounded for a week.", tags: ['sad', 'bad', 'family'] },
  { text: "An entire pack of chewing gum.", tags: ['food', 'school', 'absurd'] },
  { text: "A monkey in a tuxedo.", tags: ['animals', 'absurd', 'nerdy'] },
  { text: "Crying over spilled milk.", tags: ['sad', 'food', 'family'] },
  { text: "A secret handshake.", tags: ['secret', 'nerdy', 'school'] },
  { text: "Picking my nose.", tags: ['gross', 'body', 'school'] },
  { text: "A tiny horse.", tags: ['absurd', 'animals'] },
  { text: "A disappointed sigh.", tags: ['sad', 'bad', 'family'] },
  { text: "Explosions.", tags: ['absurd', 'scary', 'action', 'violence'] },
  { text: "Bees?", tags: ['absurd', 'scary', 'animals'] },
  { text: "Puppies!", tags: ['absurd', 'animals'] },
  { text: "A surprisingly spicy meatball.", tags: ['food', 'absurd'] },
  { text: "A really cool rock I found.", tags: ['nerdy', 'absurd', 'school'] },
  { text: "Doing a sick backflip.", tags: ['action', 'absurd'] },
  { text: "A giant bowl of spaghetti.", tags: ['food', 'gross'] },
  { text: "My grandma.", tags: ['family', 'sad'] },
  { text: "A magical glowing wand.", tags: ['action', 'nerdy', 'absurd'] },
  { text: "Lots and lots of glitter.", tags: ['absurd', 'gross', 'bad'] },
  { text: "A very loud, echoing burp.", tags: ['gross', 'body', 'bad'] },
  { text: "A puppy with big floppy ears.", tags: ['animals', 'absurd'] },
  { text: "Eating pizza for breakfast.", tags: ['food', 'bad', 'absurd'] },
  { text: "A shiny new bicycle.", tags: ['action', 'family', 'school'] },
  { text: "A functioning time machine.", tags: ['nerdy', 'action', 'absurd'] },
  { text: "Pretending to be a T-Rex.", tags: ['absurd', 'action', 'animals'] },
  { text: "A friendly ghost saying 'Boo!'.", tags: ['scary', 'absurd', 'secret'] },
  { text: "A dog that can speak English.", tags: ['animals', 'absurd', 'secret'] },
  { text: "Getting a massive brain freeze.", tags: ['body', 'food', 'sad', 'bad'] },
  { text: "A mountain of pancakes.", tags: ['food', 'absurd'] },
  { text: "Getting lost in a corn maze.", tags: ['scary', 'action'] },
  { text: "A very polite bear.", tags: ['animals', 'absurd'] },
  { text: "Drinking soda out of a shoe.", tags: ['gross', 'food', 'absurd'] },
  { text: "A trampoline filled with Jello.", tags: ['food', 'absurd', 'action'] },
  { text: "Riding a dinosaur to school.", tags: ['animals', 'school', 'action', 'absurd'] },
  { text: "A surprisingly smart potato.", tags: ['food', 'absurd', 'nerdy'] },
  { text: "A wizard who only knows one useless spell.", tags: ['nerdy', 'absurd', 'action'] },
  { text: "Finding twenty dollars in your winter coat.", tags: ['family', 'secret', 'action'] },
  { text: "A giant inflatable T-Rex costume.", tags: ['animals', 'absurd', 'nerdy'] },
  { text: "Eating dessert before dinner.", tags: ['food', 'bad', 'family'] },
  { text: "A robot best friend.", tags: ['nerdy', 'absurd', 'secret'] },
  { text: "A treehouse with a secret trapdoor.", tags: ['family', 'secret', 'action'] },
  { text: "Sneezing so hard you fall over.", tags: ['body', 'gross', 'action'] },
  { text: "A flock of seagulls stealing your fries.", tags: ['animals', 'food', 'bad'] }
];

const MEH_WHITE_CARDS = [
  { text: "A big wet fart.", tags: ['gross', 'body'] },
  { text: "Pooping in the sandbox.", tags: ['gross', 'bad', 'school', 'body'] },
  { text: "My dad's hairy back.", tags: ['gross', 'body', 'scary', 'family'] },
  { text: "Doing crimes.", tags: ['bad', 'action', 'politics'] },
  { text: "Throwing up on a roller coaster.", tags: ['gross', 'bad', 'action', 'body'] },
  { text: "My search history.", tags: ['secret', 'bad', 'nerdy'] },
  { text: "A diaper explosion.", tags: ['gross', 'bad', 'body'] },
  { text: "The middle finger.", tags: ['bad', 'school', 'body'] },
  { text: "Peeing in the pool.", tags: ['gross', 'secret', 'bad', 'body'] },
  { text: "A really ugly baby.", tags: ['absurd', 'gross', 'family'] },
  { text: "A giant booger hanging out of my nose.", tags: ['gross', 'body', 'school'] },
  { text: "Crippling debt.", tags: ['sad', 'dark', 'politics'] },
  { text: "The sweet release of death.", tags: ['dark', 'sad', 'religion'] },
  { text: "Dead parents.", tags: ['dark', 'sad', 'scary', 'family'] },
  { text: "Farting and walking away.", tags: ['gross', 'bad', 'secret', 'body'] },
  { text: "A foul mouth.", tags: ['bad', 'body'] },
  { text: "Alcoholism.", tags: ['sad', 'dark', 'bad', 'family'] },
  { text: "Chainsaws for hands.", tags: ['action', 'absurd', 'scary', 'body', 'violence'] },
  { text: "Unfathomable stupidity.", tags: ['bad', 'politics'] },
  { text: "Police brutality.", tags: ['dark', 'politics', 'violence', 'bad'] },
  { text: "Existential dread.", tags: ['sad', 'dark', 'nerdy'] },
  { text: "Daddy issues.", tags: ['sad', 'family', 'sex', 'dark'] },
  { text: "Finding a dead body in the woods.", tags: ['dark', 'scary', 'secret', 'violence'] },
  { text: "Accidentally liking an ex's photo from 2012.", tags: ['sad', 'bad', 'secret', 'nerdy'] },
  { text: "Selling your soul to the devil.", tags: ['dark', 'religion', 'secret'] },
  { text: "A sweaty, hairy chest.", tags: ['gross', 'body', 'sex'] },
  { text: "Stepping in a deep puddle with fresh socks on.", tags: ['sad', 'body', 'bad'] },
  { text: "A very aggressive and territorial goose.", tags: ['animals', 'scary', 'bad'] },
  { text: "Telling a bad joke and nobody laughs.", tags: ['sad', 'bad', 'school'] },
  { text: "Getting caught violently picking a wedgie.", tags: ['gross', 'body', 'secret', 'bad'] },
  { text: "A public toilet that won't stop running.", tags: ['bad', 'gross', 'sad'] },
  { text: "Bumper-to-bumper traffic on a Monday morning.", tags: ['sad', 'bad', 'dark'] },
  { text: "An expired 10% off coupon.", tags: ['sad', 'bad'] },
  { text: "Accidentally calling your teacher 'Mom'.", tags: ['sad', 'school', 'secret', 'bad'] },
  { text: "A highly questionable, spreading rash.", tags: ['gross', 'body', 'scary'] },
  { text: "Losing your car keys in the snow.", tags: ['sad', 'bad', 'secret'] },
  { text: "A slightly damp, mildewy towel.", tags: ['gross', 'bad', 'sad'] },
  { text: "Eating food off the dirty floor.", tags: ['gross', 'food', 'bad'] },
  { text: "A poorly timed, explosive sneeze.", tags: ['body', 'bad', 'gross'] },
  { text: "Passive-aggressive sticky notes from a coworker.", tags: ['bad', 'secret', 'dark'] },
  { text: "A really, really bad haircut.", tags: ['sad', 'bad', 'body'] },
  { text: "A midlife crisis.", tags: ['sad', 'bad'] },
  { text: "Forgetting your own phone number.", tags: ['sad', 'bad', 'nerdy'] },
  { text: "Eating mayo straight from the jar.", tags: ['gross', 'food', 'sad'] },
  { text: "An uncomfortable silence.", tags: ['sad', 'bad', 'dark'] },
  { text: "Accidentally replying all to a company-wide email.", tags: ['bad', 'secret', 'sad'] },
  { text: "A suspiciously cheap sushi restaurant.", tags: ['food', 'gross', 'scary'] },
  { text: "Being ghosted.", tags: ['sad', 'bad', 'secret'] },
  { text: "A grown adult throwing a temper tantrum.", tags: ['sad', 'bad', 'family'] },
  { text: "The inevitable heat death of the universe.", tags: ['dark', 'nerdy', 'sad'] },
  { text: "A lukewarm cup of coffee.", tags: ['sad', 'food'] },
  { text: "Stepping in a wet spot with socks on.", tags: ['sad', 'body', 'bad'] },
  { text: "Explaining the internet to your grandparents.", tags: ['family', 'sad', 'nerdy'] },
  { text: "A mild case of food poisoning.", tags: ['gross', 'body', 'sad', 'food'] },
  { text: "Paying a monthly subscription for something you never use.", tags: ['sad', 'bad'] },
  { text: "A really awkward high-five.", tags: ['sad', 'body', 'action'] }
];

const NSFW_WHITE_CARDS = [
  { text: "Dick fingers.", tags: ['absurd', 'gross', 'sex', 'body', 'nsfw'] },
  { text: "Flying sex snakes.", tags: ['absurd', 'sex', 'scary', 'action', 'animals'] },
  { text: "My collection of high-tech sex toys.", tags: ['nerdy', 'sex', 'secret', 'nsfw'] },
  { text: "A salty surprise.", tags: ['sex', 'gross', 'secret', 'food'] },
  { text: "Pac-Man uncontrollably guzzling cum.", tags: ['nerdy', 'sex', 'gross', 'absurd', 'nsfw'] },
  { text: "Two midgets shitting into a bucket.", tags: ['gross', 'dark', 'sex', 'nsfw'] },
  { text: "Incest.", tags: ['sex', 'dark', 'gross', 'family', 'nsfw'] },
  { text: "A stray pube.", tags: ['gross', 'body', 'sex', 'nsfw'] },
  { text: "The Jews.", tags: ['dark', 'absurd', 'religion', 'politics'] },
  { text: "Getting naked and watching Nickelodeon.", tags: ['sex', 'nerdy', 'absurd', 'nsfw'] },
  { text: "A micro-penis.", tags: ['sex', 'body', 'sad', 'nsfw'] },
  { text: "A robust mongoloid.", tags: ['dark', 'absurd', 'body'] },
  { text: "Snorting coke off a hooker's ass.", tags: ['sex', 'action', 'nsfw', 'dark'] },
  { text: "A sad handjob.", tags: ['sex', 'sad', 'body', 'nsfw'] },
  { text: "Queefing.", tags: ['sex', 'gross', 'body', 'nsfw'] },
  { text: "A big ol' bag of dildos.", tags: ['sex', 'nsfw', 'absurd'] },
  { text: "Accidental anal.", tags: ['sex', 'nsfw', 'bad', 'action'] },
  { text: "A crippling, life-ruining porn addiction.", tags: ['sex', 'nsfw', 'sad', 'secret', 'dark'] },
  { text: "Getting stuck step-sister style in the washing machine.", tags: ['nsfw', 'absurd', 'action', 'sex'] },
  { text: "A highly infectious venereal disease.", tags: ['gross', 'body', 'nsfw', 'scary'] },
  { text: "Vigorous fisting.", tags: ['sex', 'nsfw', 'action', 'body'] },
  { text: "A suspiciously sticky mechanical keyboard.", tags: ['gross', 'nsfw', 'nerdy', 'secret'] },
  { text: "Choking on a rusty gag ball.", tags: ['sex', 'nsfw', 'dark', 'body'] },
  { text: "A surprisingly aggressive, dry handjob.", tags: ['sex', 'nsfw', 'action', 'bad'] },
  { text: "Buying illegal narcotics on the dark web.", tags: ['dark', 'secret', 'nsfw', 'nerdy'] },
  { text: "A used, inside-out condom.", tags: ['gross', 'body', 'nsfw'] },
  { text: "Unforgiving bukkake.", tags: ['sex', 'nsfw', 'gross', 'action'] },
  { text: "A severely prolapsed rectum.", tags: ['gross', 'body', 'nsfw', 'scary'] },
  { text: "Getting peed on for sexual gratification.", tags: ['gross', 'sex', 'nsfw', 'secret'] },
  { text: "An incredibly uncomfortable conversation about your weird fetishes.", tags: ['sex', 'nsfw', 'bad', 'sad', 'secret'] },
  { text: "Aggressive nipple clamps.", tags: ['sex', 'nsfw', 'body', 'action'] },
  { text: "A surprisingly gentle prostate exam.", tags: ['body', 'nsfw', 'sex', 'weird'] },
  { text: "Accidentally joining a cult.", tags: ['dark', 'religion', 'secret', 'bad'] },
  { text: "Getting caught masturbating on a Zoom call.", tags: ['nsfw', 'sex', 'bad', 'secret', 'nerdy'] },
  { text: "A gimp suit made of recycled plastic.", tags: ['sex', 'nsfw', 'nerdy', 'body'] },
  { text: "Fucking a warm apple pie.", tags: ['sex', 'nsfw', 'food', 'absurd'] },
  { text: "A furiously vibrating pocket pussy.", tags: ['sex', 'nsfw', 'body', 'nerdy'] },
  { text: "Getting pegged by a dominant woman.", tags: ['sex', 'nsfw', 'action', 'body'] },
  { text: "A three-way with two people who hate each other.", tags: ['sex', 'nsfw', 'sad', 'dark'] },
  { text: "A sex doll that looks exactly like my boss.", tags: ['sex', 'nsfw', 'secret', 'scary'] },
  { text: "Unprotected sex with a stranger.", tags: ['sex', 'nsfw', 'bad', 'action'] },
  { text: "A raging yeast infection.", tags: ['gross', 'body', 'nsfw', 'sad'] },
  { text: "Accidentally drinking bong water.", tags: ['gross', 'nsfw', 'bad', 'food'] },
  { text: "A wildly inappropriate boner at a funeral.", tags: ['body', 'nsfw', 'bad', 'dark', 'sad'] },
  { text: "Selling feet pics to pay off student loans.", tags: ['body', 'nsfw', 'sad', 'secret'] }
];

// --- PLAYER COLORS ---
const COLOR_THEMES = [
  { id: 'blue', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  { id: 'pink', bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-300' },
  { id: 'emerald', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
  { id: 'purple', bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  { id: 'orange', bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' }
];

const HUMAN_THEME = { id: 'zinc', bg: 'bg-zinc-100', text: 'text-zinc-800', border: 'border-zinc-300' };

// --- HELPER FUNCTIONS ---
const generateId = () => Math.random().toString(36).substr(2, 9);

const assignCategory = (cards, category) => cards.map(c => ({ ...c, id: generateId(), category }));

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

// AI LOGIC ENGINE
const evaluateCardMatch = (whiteCard, blackCard) => {
  let score = 0;
  const bTags = blackCard.tags || [];
  const wTags = whiteCard.tags || [];

  // Direct matches - highly favored
  wTags.forEach(tag => {
    if (bTags.includes(tag)) score += 10;
  });

  // Synergies - Making the AI feel clever
  const synergies = {
    sad: ['dark', 'family', 'school'],
    gross: ['body', 'food', 'nsfw', 'animals'],
    sex: ['nsfw', 'body', 'secret'],
    absurd: ['action', 'animals', 'nerdy', 'scary', 'food'],
    dark: ['sad', 'politics', 'religion', 'violence'],
    nerdy: ['school', 'secret', 'pop-culture'],
    bad: ['school', 'politics', 'action', 'sad']
  };

  wTags.forEach(wTag => {
    if (synergies[wTag]) {
      synergies[wTag].forEach(synTag => {
        if (bTags.includes(synTag)) score += 5;
      });
    }
  });

  // Contextual text analysis
  const bText = blackCard.text.toLowerCase();
  const wText = whiteCard.text.toLowerCase();

  if (bText.includes('why') && wTags.includes('sad')) score += 4;
  if ((bText.includes('who') || bText.includes('president')) && (wTags.includes('politics') || wTags.includes('pop-culture'))) score += 5;
  if (bText.includes('smell') && wTags.includes('gross')) score += 6;
  if (bText.includes('secret') && wTags.includes('secret')) score += 6;

  // Add a tiny bit of randomness to break ties
  score += Math.random() * 2; 
  return score;
};

// --- MAIN COMPONENT ---
export default function App() {
  const [gameState, setGameState] = useState('menu'); // menu, setup, czar_picking, playing, judging, round_end, game_over, card_manager
  const [isHandExpanded, setIsHandExpanded] = useState(false);
  
  // Settings
  const [aiCount, setAiCount] = useState(4);
  const [nsfwLevel, setNsfwLevel] = useState(50); 

  // Master Card Library State
  const [allBlackCards, setAllBlackCards] = useState(() => [
    ...assignCategory(FRIENDLY_BLACK_CARDS, 'friendly'),
    ...assignCategory(MEH_BLACK_CARDS, 'meh'),
    ...assignCategory(NSFW_BLACK_CARDS, 'nsfw')
  ]);
  const [allWhiteCards, setAllWhiteCards] = useState(() => [
    ...assignCategory(FRIENDLY_WHITE_CARDS, 'friendly'),
    ...assignCategory(MEH_WHITE_CARDS, 'meh'),
    ...assignCategory(NSFW_WHITE_CARDS, 'nsfw')
  ]);

  // Card Manager Form State
  const [managerFilterType, setManagerFilterType] = useState('black'); 
  const [managerFilterCategory, setManagerFilterCategory] = useState('all');
  const [newCardText, setNewCardText] = useState('');
  const [newCardCategory, setNewCardCategory] = useState('friendly');

  // Game Data
  const [blackDeck, setBlackDeck] = useState([]);
  const [whiteDeck, setWhiteDeck] = useState([]);
  const [players, setPlayers] = useState([]);
  const [czarIndex, setCzarIndex] = useState(0);
  const [blackCardOptions, setBlackCardOptions] = useState([]); // Array of cards for the czar to pick from
  const [currentBlackCard, setCurrentBlackCard] = useState(null);
  const [playedCards, setPlayedCards] = useState([]);
  const [roundWinner, setRoundWinner] = useState(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const pointsToWin = 5;

  const playedCardsRef = useRef([]);

  // --- GAME SETUP & LOGIC ---
  const initGame = () => {
    // Determine allowed categories based on the slider setting
    const allowedCategories = nsfwLevel < 33 ? ['friendly'] : nsfwLevel < 66 ? ['friendly', 'meh'] : ['friendly', 'meh', 'nsfw'];

    let bDeck = shuffle(allBlackCards.filter(c => allowedCategories.includes(c.category)));
    let wDeck = shuffle(allWhiteCards.filter(c => allowedCategories.includes(c.category)));

    // Fallback if the user deleted too many cards
    if (bDeck.length < 10) bDeck = shuffle([...allBlackCards]);
    if (wDeck.length < 50) wDeck = shuffle([...allWhiteCards]);

    // Build Players with Colors
    const botNames = ['AI Dave', 'AI Sarah', 'AI Mike', 'AI Chloe', 'AI Chad'];
    const initialPlayers = [
      { id: 'human', name: 'You', type: 'human', theme: HUMAN_THEME, hand: [], score: 0, isCzar: false, hasPlayed: false }
    ];

    for (let i = 0; i < aiCount; i++) {
      initialPlayers.push({ 
        id: `ai${i+1}`, 
        name: botNames[i], 
        type: 'bot', 
        theme: COLOR_THEMES[i % COLOR_THEMES.length], 
        hand: [], score: 0, isCzar: false, hasPlayed: false 
      });
    }

    const initialCzarIndex = Math.floor(Math.random() * initialPlayers.length);
    startRound(initialPlayers, bDeck, initialCzarIndex, wDeck, 1);
  };

  const startRound = (currentPlayers, bDeck, cIndex, wDeck, rNumber) => {
    let currentWhiteIdx = 0;
    
    // Replenish hands
    const newPlayers = currentPlayers.map((p, idx) => {
      const cardsNeeded = 10 - p.hand.length;
      const newCards = wDeck.slice(currentWhiteIdx, currentWhiteIdx + cardsNeeded);
      currentWhiteIdx += cardsNeeded;
      return {
        ...p,
        hand: [...p.hand, ...newCards],
        isCzar: idx === cIndex,
        hasPlayed: false
      };
    });

    // Draw up to 3 black cards for the Czar to pick
    const cardsToDraw = Math.min(3, bDeck.length);
    const drawnBlackCards = bDeck.slice(0, cardsToDraw);
    
    setWhiteDeck(wDeck.slice(currentWhiteIdx));
    setBlackDeck(bDeck.slice(cardsToDraw));
    setPlayers(newPlayers);
    setBlackCardOptions(drawnBlackCards);
    setCurrentBlackCard(null);
    setCzarIndex(cIndex);
    setRoundNumber(rNumber);
    setPlayedCards([]);
    playedCardsRef.current = [];
    setRoundWinner(null);
    setGameState('czar_picking');
  };

  const handleBlackCardChoice = (selectedCard) => {
    // Put the unselected cards back at the bottom of the deck so we don't run out
    const unselectedCards = blackCardOptions.filter(c => c.text !== selectedCard.text);
    setBlackDeck(prev => [...prev, ...unselectedCards]);
    setCurrentBlackCard(selectedCard);
    setGameState('playing');
  };

  const handleNextRound = () => {
    if (players.some(p => p.score >= pointsToWin)) {
      setGameState('game_over');
      return;
    }
    const nextCzarIdx = (czarIndex + 1) % players.length;
    startRound(players, blackDeck, nextCzarIdx, whiteDeck, roundNumber + 1);
  };

  const playCard = (playerId, cardObj) => {
    if (playerId === 'human') {
      setIsHandExpanded(false); // Auto close hand when a card is played
    }

    const totalPlayers = players.length;

    setPlayers(prevPlayers => {
      const player = prevPlayers.find(p => p.id === playerId);
      if (!player || player.hasPlayed) return prevPlayers;

      return prevPlayers.map(p =>
        p.id === playerId ? { ...p, hasPlayed: true, hand: p.hand.filter(c => c.text !== cardObj.text) } : p
      );
    });

    setPlayedCards(prevPlayed => {
      // Prevent duplicate plays in case of rapid events
      if (prevPlayed.some(p => p.playerId === playerId)) return prevPlayed;

      const newPlayed = [...prevPlayed, { playerId, card: cardObj }];
      playedCardsRef.current = newPlayed; 
      
      if (newPlayed.length === totalPlayers - 1) {
        setTimeout(() => {
          setPlayedCards(current => shuffle([...current])); 
          setGameState('judging');
        }, 1500); 
      }
      return newPlayed;
    });
  };

  const handleJudgeCard = (winningPlay) => {
    setRoundWinner(winningPlay.playerId);
    setPlayers(prev => prev.map(p =>
      p.id === winningPlay.playerId ? { ...p, score: p.score + 1 } : p
    ));
    setGameState('round_end');
  };

  // --- AI LOGIC: CZAR PICKING BLACK CARD ---
  useEffect(() => {
    if (gameState === 'czar_picking') {
      const czar = players.find(p => p.isCzar);
      if (czar && czar.type === 'bot' && blackCardOptions.length > 0) {
        const timeout = setTimeout(() => {
          // Bot picks a random black card
          const randomIdx = Math.floor(Math.random() * blackCardOptions.length);
          handleBlackCardChoice(blackCardOptions[randomIdx]);
        }, 2000 + Math.random() * 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [gameState, blackCardOptions]);

  // --- AI LOGIC: PLAYING WHITE CARDS ---
  useEffect(() => {
    if (gameState === 'playing') {
      const timeouts = [];
      players.forEach(p => {
        if (p.type === 'bot' && !p.isCzar && !p.hasPlayed) {
          const delay = 1500 + Math.random() * 3000; 
          const timeout = setTimeout(() => {
            if (currentBlackCard) {
              let bestCard = p.hand[0];
              let bestScore = -1;
              p.hand.forEach(card => {
                const score = evaluateCardMatch(card, currentBlackCard);
                if (score > bestScore) {
                  bestScore = score;
                  bestCard = card;
                }
              });
              playCard(p.id, bestCard);
            }
          }, delay);
          timeouts.push(timeout);
        }
      });
      return () => timeouts.forEach(clearTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, roundNumber, currentBlackCard]); 

  // --- AI LOGIC: JUDGING ---
  useEffect(() => {
    if (gameState === 'judging') {
      const czar = players.find(p => p.isCzar);
      if (czar && czar.type === 'bot') {
        const delay = 3500 + Math.random() * 3000; 
        const timeout = setTimeout(() => {
          const currentPlayed = playedCardsRef.current;
          if (currentPlayed.length > 0 && currentBlackCard) {
            let bestPlay = currentPlayed[0];
            let bestScore = -1;
            currentPlayed.forEach(play => {
               const score = evaluateCardMatch(play.card, currentBlackCard);
               if (score > bestScore) {
                 bestScore = score;
                 bestPlay = play;
               }
            });
            handleJudgeCard(bestPlay);
          }
        }, delay);
        return () => clearTimeout(timeout);
      }
    }
  }, [gameState, currentBlackCard]);

  // --- AUTO NEXT ROUND ---
  useEffect(() => {
    if (gameState === 'round_end') {
      const timeout = setTimeout(() => {
        handleNextRound();
      }, 3500);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // --- RENDER HELPERS ---
  const human = players.find(p => p.id === 'human');
  const czar = players.find(p => p.isCzar);
  
  const getStatusMessage = () => {
    if (gameState === 'czar_picking') {
      if (human?.isCzar) return "Choose the Black Card for this round!";
      return `${czar?.name} is picking a Black Card...`;
    }
    if (gameState === 'playing') {
      if (human?.isCzar) return "You are the Card Czar! Waiting for players...";
      if (!human?.hasPlayed) return "Choose a card to play.";
      return "Waiting for others to play...";
    }
    if (gameState === 'judging') {
      if (human?.isCzar) return "You are the Card Czar! Pick the winning card.";
      return `${czar?.name} is judging...`;
    }
    if (gameState === 'round_end') {
      const winnerName = players.find(p => p.id === roundWinner)?.name;
      return `${winnerName} wins the round!`;
    }
    return "";
  };

  const Card = ({ text, isBlack, onClick, className = "", hover = false, dynamicBg, dynamicBorder }) => (
    <div 
      onClick={onClick}
      className={`
        relative flex flex-col justify-between p-4 sm:p-5 rounded-xl shadow-lg 
        w-36 sm:w-48 h-48 sm:h-64 flex-shrink-0 cursor-pointer 
        transition-all duration-300 ease-out border-2
        ${isBlack ? 'bg-zinc-950 text-white border-zinc-700' : (dynamicBg || 'bg-white') + ' ' + (dynamicBorder || 'border-zinc-200')}
        ${!isBlack ? 'text-zinc-900' : ''}
        ${hover ? 'hover:-translate-y-4 hover:shadow-xl hover:border-zinc-400' : ''}
        ${className}
      `}
    >
      <div className="font-bold text-base sm:text-xl leading-tight">
        {text}
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2 mt-4 opacity-50 text-[10px] sm:text-sm font-bold uppercase tracking-wider">
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-current"></div>
        Cards vs AI
      </div>
    </div>
  );

  // --- VIEWS ---
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-white font-sans relative overflow-hidden selection:bg-zinc-700">
        
        {/* Floating Background Card Silhouettes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
           <div className="absolute -top-10 -left-10 w-48 h-64 bg-zinc-800 rounded-2xl transform -rotate-12 border border-zinc-700 blur-[1px]"></div>
           <div className="absolute top-40 -right-20 w-64 h-80 bg-zinc-800 rounded-2xl transform rotate-12 border border-zinc-700 blur-[2px]"></div>
           <div className="absolute -bottom-20 left-1/4 w-56 h-72 bg-zinc-800 rounded-2xl transform -rotate-6 border border-zinc-700 blur-[1px]"></div>
           <div className="absolute top-1/4 left-1/3 w-32 h-48 bg-zinc-800 rounded-2xl transform rotate-45 border border-zinc-700 blur-[3px]"></div>
        </div>

        <div className="max-w-4xl w-full relative z-10 flex flex-col items-center space-y-16">
          
          {/* Staggered Card Title */}
          <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-5">
            <div className="bg-white text-zinc-950 px-8 py-3 sm:px-10 sm:py-4 rounded-xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-none">Cards</h1>
            </div>
            <div className="bg-white text-zinc-950 px-8 py-3 sm:px-10 sm:py-4 rounded-xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300 sm:ml-16">
              <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-none">Against</h1>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 sm:ml-32 flex items-center gap-4">
              <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-none flex items-center gap-4">
                AI <Bot className="w-14 h-14 sm:w-20 sm:h-20 text-blue-400 animate-pulse drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
              </h1>
            </div>
          </div>

          <div className="space-y-8 flex flex-col items-center">
            <p className="text-zinc-400 text-lg sm:text-2xl font-medium tracking-wide text-center max-w-2xl px-4">
              A terrible party game for you and your completely soulless robotic friends.
            </p>

            <button 
              onClick={() => setGameState('setup')}
              className="group relative inline-flex items-center gap-3 bg-white text-zinc-950 px-10 py-5 rounded-full font-black text-xl sm:text-2xl hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95"
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
              Enter the Madness
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
            </button>

            <button 
              onClick={() => setGameState('card_manager')}
              className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold text-lg transition-colors mt-4"
            >
              <Library className="w-5 h-5" />
              View & Manage Cards
            </button>
          </div>
          
        </div>
      </div>
    );
  }

  if (gameState === 'card_manager') {
    const displayedCards = (managerFilterType === 'black' ? allBlackCards : allWhiteCards)
      .filter(c => managerFilterCategory === 'all' || c.category === managerFilterCategory);

    const handleDelete = (id) => {
      if (managerFilterType === 'black') {
        setAllBlackCards(prev => prev.filter(c => c.id !== id));
      } else {
        setAllWhiteCards(prev => prev.filter(c => c.id !== id));
      }
    };

    const handleCreate = (e) => {
      e.preventDefault();
      if (!newCardText.trim()) return;
      
      const newCard = {
        id: generateId(),
        text: newCardText,
        tags: ['custom'],
        category: newCardCategory
      };

      if (managerFilterType === 'black') {
        setAllBlackCards(prev => [newCard, ...prev]);
      } else {
        setAllWhiteCards(prev => [newCard, ...prev]);
      }
      setNewCardText('');
    };

    return (
      <div className="min-h-screen bg-zinc-100 flex flex-col font-sans text-zinc-900">
        <header className="bg-white border-b p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
          <button onClick={() => setGameState('menu')} className="flex items-center gap-2 font-bold hover:text-zinc-500 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Menu
          </button>
          <div className="font-black uppercase tracking-widest flex items-center gap-2">
            <Library className="w-5 h-5" /> Card Library
          </div>
          <div className="w-24 hidden sm:block"></div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto w-full flex flex-col gap-8">
          
          {/* Controls */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-200 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="flex bg-zinc-100 p-1 rounded-xl w-full md:w-auto">
              <button 
                onClick={() => setManagerFilterType('black')} 
                className={`flex-1 md:w-32 py-2 font-bold rounded-lg transition-all ${managerFilterType === 'black' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                Black Cards
              </button>
              <button 
                onClick={() => setManagerFilterType('white')} 
                className={`flex-1 md:w-32 py-2 font-bold rounded-lg transition-all ${managerFilterType === 'white' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                White Cards
              </button>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
              {['all', 'friendly', 'meh', 'nsfw'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setManagerFilterCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize transition-all border shrink-0
                    ${managerFilterCategory === cat ? 'bg-zinc-200 border-zinc-400 text-zinc-900' : 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-100'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Create Form */}
          <form onSubmit={handleCreate} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-200 flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full space-y-2">
              <label className="font-bold text-sm text-zinc-500 uppercase tracking-wider">
                Create New {managerFilterType === 'black' ? 'Black' : 'White'} Card
              </label>
              <input 
                type="text" 
                value={newCardText}
                onChange={e => setNewCardText(e.target.value)}
                placeholder={managerFilterType === 'black' ? "Type a prompt (use ___ for blanks)" : "Write your own card..."}
                className="w-full p-3 bg-zinc-100 border border-zinc-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div className="w-full md:w-48 space-y-2 shrink-0">
              <label className="font-bold text-sm text-zinc-500 uppercase tracking-wider">Vibe</label>
              <select 
                value={newCardCategory}
                onChange={e => setNewCardCategory(e.target.value)}
                className="w-full p-3 bg-zinc-100 border border-zinc-200 rounded-xl font-bold capitalize focus:outline-none focus:ring-2 focus:ring-zinc-900 appearance-none cursor-pointer"
              >
                <option value="friendly">Friendly 😃</option>
                <option value="meh">Meh 😐</option>
                <option value="nsfw">NSFW 🌶️</option>
              </select>
            </div>
            <button type="submit" className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shrink-0">
              <Plus className="w-5 h-5" /> Add Card
            </button>
          </form>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pb-12">
            {displayedCards.map(card => (
              <div key={card.id} className="relative group">
                <Card 
                  text={card.text} 
                  isBlack={managerFilterType === 'black'} 
                  className="!w-full !h-40 sm:!h-48 text-sm sm:text-base cursor-default"
                />
                <div className="absolute top-2 right-2 flex gap-1 z-10 pointer-events-none">
                  <div className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white shadow-sm
                    ${card.category === 'friendly' ? 'bg-green-500' : card.category === 'meh' ? 'bg-amber-500' : 'bg-red-500'}
                  `}>
                    {card.category}
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(card.id)}
                  className="absolute bottom-2 right-2 p-2 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md translate-y-2 group-hover:translate-y-0 z-20"
                  title="Delete Card"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {displayedCards.length === 0 && (
              <div className="col-span-full py-12 text-center text-zinc-400 font-bold text-lg">
                No cards found in this category. Make some!
              </div>
            )}
          </div>

        </main>
      </div>
    );
  }

  if (gameState === 'setup') {
    // Calculate a smooth hue shift from 120 (Green) to 0 (Red) based on the slider (0-100)
    const dynamicHue = 120 - (nsfwLevel * 1.2);

    return (
      <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center p-4 sm:p-6 text-zinc-900 font-sans">
        <div className="max-w-xl w-full bg-white p-6 sm:p-10 rounded-3xl shadow-2xl space-y-10 border border-zinc-200">
          <div className="flex items-center gap-3 border-b pb-6">
            <Settings className="w-8 h-8 text-zinc-800" />
            <h2 className="text-3xl font-black uppercase tracking-tight">Game Setup</h2>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="font-bold text-xl flex items-center gap-2">
                  <Bot className="w-6 h-6" /> Opponents
                </label>
                <span className="text-2xl font-black text-zinc-400">{aiCount} Bots</span>
              </div>
              <input 
                type="range" min="1" max="5" step="1" value={aiCount} 
                onChange={(e) => setAiCount(parseInt(e.target.value))}
                className="w-full h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
              />
              <div className="flex justify-between text-sm text-zinc-500 font-semibold px-1">
                <span>1</span><span>5</span>
              </div>
            </div>
            <div className="pt-6 border-t space-y-4">
              <div className="flex justify-between items-end">
                <label className="font-bold text-xl flex items-center gap-2">
                  <Flame className="w-6 h-6" /> Deck Vibe
                </label>
              </div>
              
              {/* Dynamically styled box based on HSL color mapping */}
              <div 
                className="p-4 rounded-xl border text-center"
                style={{
                  backgroundColor: `hsl(${dynamicHue}, 80%, 90%)`,
                  borderColor: `hsl(${dynamicHue}, 80%, 75%)`,
                  color: `hsl(${dynamicHue}, 80%, 25%)`
                }}
              >
                <span className="font-black text-lg">
                  {nsfwLevel < 33 ? "Friendly & Clean" : nsfwLevel < 66 ? "A little 'Meh' & Edgy" : "Absolute Degeneracy (NSFW)"}
                </span>
                <p className="text-sm opacity-80 font-medium mt-1">
                  {nsfwLevel < 33 ? "Only wholesome and slightly silly cards." : 
                   nsfwLevel < 66 ? "Includes weird, gross, and edgy cards." : 
                   "All filters off. Includes highly explicit and dark cards."}
                </p>
              </div>
              
              <input 
                type="range" min="0" max="100" step="1" value={nsfwLevel} 
                onChange={(e) => setNsfwLevel(parseInt(e.target.value))}
                className="w-full h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: `hsl(${dynamicHue}, 80%, 45%)` }}
              />
              <div className="flex justify-between text-sm text-zinc-500 font-semibold px-1">
                <span className="flex items-center gap-1"><Smile className="w-4 h-4"/> Family</span>
                <span className="flex items-center gap-1">NSFW <Flame className="w-4 h-4"/></span>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t flex justify-end">
            <button 
              onClick={initGame}
              className="w-full flex justify-center items-center gap-2 bg-zinc-950 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-colors shadow-lg"
            >
              Deal the Cards
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'game_over') {
    const winner = players.reduce((prev, current) => (prev.score > current.score) ? prev : current);
    return (
      <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center p-6 text-zinc-900 font-sans">
        <div className="max-w-2xl w-full bg-white p-12 rounded-3xl shadow-2xl text-center space-y-8 border border-zinc-200">
          <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-6" />
          <h1 className="text-5xl font-black uppercase tracking-tighter">Game Over!</h1>
          <p className="text-2xl font-bold">
            {winner.id === 'human' ? 'You won!' : `${winner.name} won!`}
          </p>
          <div className="space-y-4 my-8">
            {players.sort((a,b) => b.score - a.score).map((p, i) => (
              <div key={p.id} className={`flex justify-between items-center text-lg font-medium px-8 py-3 rounded-xl border ${p.theme.bg} ${p.theme.border} ${p.theme.text}`}>
                <span className="flex items-center gap-2">
                  <span className="opacity-50 font-black w-6">{i+1}.</span> 
                  {p.name}
                </span>
                <span className="font-black bg-white/50 px-3 py-1 rounded-md">{p.score} pts</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setGameState('setup')}
            className="bg-zinc-950 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 transition-colors shadow-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // CORE GAME VIEWS
  return (
    <div className="min-h-screen bg-zinc-200 font-sans flex flex-col overflow-hidden text-zinc-900">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      
      {/* Top Header / Scoreboard */}
      <header className="bg-white border-b border-zinc-300 shadow-sm p-3 sm:p-4 sticky top-0 z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="font-black text-xl tracking-tighter uppercase shrink-0">Cards vs AI</div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full sm:w-auto">
          {players.map(p => (
            <div key={p.id} className={`
              flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 transition-all
              ${p.isCzar ? 'shadow-[0_0_15px_rgba(251,191,36,0.5)] border-amber-400' : p.theme.border}
              ${p.theme.bg} ${p.theme.text}
              ${p.id === 'human' ? 'ring-2 ring-offset-1 ring-zinc-900' : ''}
            `}>
              {p.isCzar ? <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" fill="currentColor" /> : 
               p.type === 'human' ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span className="hidden sm:inline">{p.name}</span>
              <span className="bg-white/60 px-1.5 rounded-md ml-0.5 sm:ml-1">{p.score}</span>
            </div>
          ))}
        </div>
        <div className="hidden lg:block text-sm font-bold text-zinc-500 shrink-0">
          Round {roundNumber}
        </div>
      </header>

      {/* Main Play Area */}
      {/* Notice the extra padding bottom applied dynamically ensuring visibility above the hand toggle! */}
      <main className={`flex-1 flex flex-col items-center justify-start p-4 sm:p-6 gap-6 overflow-y-auto w-full ${(!human?.isCzar && gameState === 'playing') ? 'pb-40' : 'pb-12'}`}>
        
        {/* CZAR PICKING PHASE */}
        {gameState === 'czar_picking' && (
          <div className="w-full flex flex-col items-center gap-6 mt-4 lg:mt-8">
            <h2 className="text-xl sm:text-3xl font-black text-zinc-800 text-center animate-pulse">{getStatusMessage()}</h2>
            
            {human?.isCzar ? (
              <div className="flex flex-row overflow-x-auto pb-4 gap-4 w-full justify-start md:justify-center px-4 snap-x hide-scrollbar">
                {blackCardOptions.map((card, idx) => (
                  <div key={idx} className="snap-center shrink-0">
                    <Card text={card.text} isBlack hover onClick={() => handleBlackCardChoice(card)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 opacity-50 pointer-events-none">
                {[1, 2, 3].map(i => (
                  <Card key={i} text="?" isBlack className="animate-pulse" />
                ))}
              </div>
            )}
          </div>
        )}

        {/* PLAYING / JUDGING PHASE */}
        {gameState !== 'czar_picking' && (
          <div className="w-full flex flex-col items-center gap-6 lg:gap-8 max-w-6xl">
            
            {/* Status Header */}
            <div className="text-center space-y-3 w-full">
              <h2 className="text-lg sm:text-3xl font-black text-zinc-800 min-h-[40px] flex items-center justify-center">
                {getStatusMessage()}
                {gameState === 'judging' && czar?.type === 'bot' && <Loader2 className="w-6 h-6 ml-3 animate-spin text-zinc-500" />}
              </h2>
              
              {/* Player Status indicators */}
              {gameState === 'playing' && (
                <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-md mx-auto">
                  {players.filter(p => !p.isCzar).map(p => (
                    <div key={p.id} className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all border
                      ${p.hasPlayed ? `${p.theme.bg} ${p.theme.text} ${p.theme.border} scale-100 shadow-sm` : 'bg-zinc-200/50 text-zinc-400 border-transparent scale-95'}
                    `}>
                      {p.hasPlayed && <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {p.name} {p.hasPlayed ? 'played' : 'thinking...'}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cards Display Area */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full gap-6 lg:gap-10">
              
              {/* Black Card */}
              {currentBlackCard && (
                <div className="shrink-0 z-10">
                  <Card text={currentBlackCard.text} isBlack />
                </div>
              )}

              {/* Judging Area (White Cards) */}
              {(gameState === 'judging' || gameState === 'round_end') && (
                <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-zinc-300/50 items-center min-h-[250px] w-full lg:w-auto flex-1 max-w-4xl">
                  {playedCards.map((play, idx) => {
                    const isWinner = gameState === 'round_end' && roundWinner === play.playerId;
                    const canJudge = gameState === 'judging' && human?.isCzar;
                    const player = players.find(p => p.id === play.playerId);
                    const playerTheme = player?.theme;
                    const showPlayerName = gameState === 'round_end' || canJudge;
                    
                    return (
                      <div key={idx} className="relative mt-4 sm:mt-6">
                        {/* Colorful Winner Label */}
                        {showPlayerName && (
                           <div className={`absolute -top-5 sm:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md z-20 transition-all
                             ${isWinner ? `${playerTheme?.bg} ${playerTheme?.text} ring-2 ${playerTheme?.border} scale-110` : `${playerTheme?.bg} ${playerTheme?.text} border ${playerTheme?.border}`}
                           `}>
                             {player?.name} {isWinner ? 'WINS!' : ''}
                           </div>
                        )}
                        
                        <Card 
                          text={play.card.text} 
                          hover={canJudge}
                          dynamicBg={showPlayerName ? playerTheme?.bg : null}
                          dynamicBorder={showPlayerName ? playerTheme?.border : null}
                          onClick={() => canJudge ? handleJudgeCard(play) : null}
                          className={`
                            ${isWinner ? `ring-4 ring-offset-2 ${playerTheme?.border} scale-105 shadow-2xl z-10` : ''}
                            ${gameState === 'round_end' && !isWinner ? 'opacity-50 scale-95 grayscale' : ''}
                            ${canJudge ? `hover:scale-105 hover:shadow-xl` : ''}
                          `}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Next Round Indicator */}
            {gameState === 'round_end' && (
              <div className="mt-6 flex items-center justify-center gap-3 w-full text-zinc-500 font-bold text-lg animate-pulse">
                <Loader2 className="w-6 h-6 animate-spin" />
                Starting next round...
              </div>
            )}

          </div>
        )}
      </main>

      {/* Hand Area (Bottom) - Only shows when you aren't the czar and are playing */}
      <div className={`
        bg-zinc-800 transition-all duration-500 ease-in-out fixed bottom-0 left-0 w-full z-30 rounded-t-2xl sm:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.3)]
        ${gameState === 'playing' && !human?.isCzar ? (isHandExpanded ? 'translate-y-0 opacity-100' : 'translate-y-[calc(100%-56px)] opacity-100') : 'translate-y-full opacity-0 pointer-events-none'}
      `}>
        <div className="max-w-7xl mx-auto flex flex-col">
          {/* Toggle Header */}
          <button
            onClick={() => setIsHandExpanded(!isHandExpanded)}
            className="w-full h-[56px] px-4 sm:px-6 flex items-center justify-between text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs sm:text-sm">
              Your Hand
              {isHandExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </div>
            {human?.hasPlayed && <span className="text-emerald-400 flex items-center gap-1 text-xs sm:text-sm font-bold uppercase tracking-widest"><CheckCircle2 className="w-4 h-4"/> Card Played</span>}
          </button>

          <div className="px-4 pb-6 sm:px-6 sm:pb-8 flex overflow-x-auto gap-3 sm:gap-4 snap-x hide-scrollbar">
            {human?.hand.map((cardObj, idx) => (
              <div key={idx} className={`snap-start transition-all duration-300 ${human.hasPlayed ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                <Card 
                  text={cardObj.text} 
                  hover={!human?.hasPlayed}
                  onClick={() => {
                    if (gameState === 'playing' && !human?.isCzar && !human?.hasPlayed) {
                      playCard('human', cardObj);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
