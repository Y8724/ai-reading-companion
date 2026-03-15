--
-- PostgreSQL database dump
--

\restrict VQXEwLZmpijw9pkWV3VYhWA3hHNtnx0PnVI3kFfrbsYaCC9DSvyWOpM7T9uZNer

-- Dumped from database version 15.13
-- Dumped by pg_dump version 15.17 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying NOT NULL,
    author character varying,
    isbn character varying,
    description text,
    notes text,
    ai_summary text
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (id, title, author, isbn, description, notes, ai_summary) FROM stdin;
1	The Stranger	Albert Camus	9780141182506	A philosophical novel	Existentialism and absurdism	Existentialism and absurdism are philosophical movements that explore the nature of existence and the human experience. Existentialism emphasizes individual freedom, choice, and the search for meaning in a seemingly indifferent or chaotic universe. Prominent figures include Jean-Paul Sartre and Simone de Beauvoir. Absurdism, closely related to existentialism, focuses on the inherent conflict between humans' desire for meaning and the meaningless universe, as articulated by philosophers like Albert Camus. While existentialists seek to create personal meaning, absurdists often highlight the futility of such pursuits. Both philosophies emphasize the importance of personal experience and the subjective nature of reality.
5	Happy	Derren Brown	\N	\N	The greatest burden a child must bear is the unlived lives of the parents.\n\nDon’t become so annoyed by someone that you become a source of annoyance to others.\n\nNo one has the direct means to affect your self-control or dignity.\n\nEveryone thinks the limits of their own field of vision are the limits of the world.\n\nThe story you tell yourself of your life is a confabulation.\nDon’t mistake your constructed life story as the truth.\n\nYou are not characters in a movie whose personalities are clearly defined and predictable.\nYou can act out of character.	The key ideas from the text highlight the challenges children face due to their parents' unfulfilled lives, the importance of self-control and dignity in interactions, and the limitations of personal perspective. It emphasizes that individuals often construct false narratives about their lives and should not confuse these stories with reality. Additionally, it suggests that people are not limited by fixed personalities and can act beyond their established character traits.
6	Quiet	Susan Cain	\N	\N	You're told that you're "in your head too much." There's another word for such people: thinkers.\n\nIntroversion is a preference for environments that are not overstimulating.\n\nFinland is a famously introverted nation. Finnish joke: How can you tell if a Finn likes you? He's staring at your shoes instead of his own.\n\nIn the Culture of Character, the ideal self was serious, disciplined, and honorable. What counted was not so much the impression one made in public as how one behaved in private. But when they embraced the Culture of Personality, Americans started to focus on how others perceived them. They became captivated by people who were bold and entertaining. The social role demanded of all in the new Culture of Personality was that of a performer.\n\nExtroversion is less prevalent in Asia and Africa than in Europe and America, whose populations descend largely from the migrants of the world. World travelers were more extroverted than those who stayed home. Americans found themselves working no longer with neighbors but with strangers. Facing the question of how to make a good impression on people to whom they had no civic or family ties.\n	The text discusses the distinction between introversion and extroversion, highlighting that introverts prefer less stimulating environments. It uses Finland, known for its introverted culture, as an example, pointing out a humorous cultural trait. Furthermore, it contrasts the "Culture of Character," which valued private behavior, with the "Culture of Personality," where public perceptions became paramount, emphasizing performance and charisma. The text notes that extroversion is less common in Asia and Africa compared to Europe and America, where people tend to be more extroverted, especially in social settings with unfamiliar individuals.
2	Relationship Handbook	George Pransky	0998874205	Best philosophy of love relationships I’ve ever found. Like meditation teaches you that moods pass, this experienced marriage counselor says this applies to relationship communication as well	Insecurity is the source of distress and all counterproductive behavior.Thoughts of insecurity periodically pass through our minds. If we dismiss these thoughts, we will remain secure, our ideal selves: easygoing, joyful, compassionate and wise.\nIf we harbor our thoughts of insecurity, we end up in a state of distress.\n\nAnalyzing problems makes you an expert on your problems. It doesn’t change you.\n\nCounselors ask clients to list their problems. This step makes all the problems vivid in the clients’ minds, thereby lowering their spirits, as they delve into each problem in detail.\nProblems then seem so formidable that clients are discouraged.\n\nA characteristic of very low moods is that every little problem looks like the tip of an iceberg.\nMaintaining a sense of well-being is all it takes to make the relationship enjoyable and easy, and to feel warm and respectful toward each other, even in hard times.\n\nWhen differences are viewed with respect, partners are viewed as complementary.\nThe same differences viewed from a feeling of discontent will make the partners seem incompatible.\nIt is the feeling that makes the difference.	Insecurity is a source of distress and counterproductive behavior. Dismissing thoughts of insecurity helps maintain a sense of security and fosters a joyful, compassionate self. Conversely, dwelling on these thoughts leads to increased distress and a focus on problems, which discourages individuals by making issues seem overwhelming. Counselors often exacerbate this by encouraging clients to list their problems, giving them more weight and lowering their spirits. Maintaining well-being in relationships allows for enjoyment and respect even during challenges, while viewing differences positively leads to a sense of complementarity between partners. Feeling affects how differences are perceived—discontent leads to a sense of incompatibility, while a positive outlook fosters appreciation.
3	12 Rules for Life	Jordan Peterson	\N	\N	Without rules we quickly become slaves to our passions - and there’s nothing freeing about that.  We are quick to aim low and worship qualities that are beneath us.  The psychological mystery of self-deception: How can a person deceive himself and get away with it?  Be wary of ideology, no matter who is peddling it or to what end. Ideologies are simple ideas, disguised as science or philosophy, that purport to explain the complexity of the world and offer remedies that will perfect it.  Adopt as much responsibility as possible for individual life, society and the world. Tell the truth. Repair what is in disrepair. Break down and recreate what is old and outdated. This is how we can and must reduce the suffering that poisons the world.	The text emphasizes the importance of rules in maintaining freedom from our passions and warns against idolizing lesser qualities. It discusses self-deception and the dangers of ideologies that oversimplify complex issues. It advocates for personal responsibility, truth-telling, and the repair or re-creation of outdated systems as ways to alleviate suffering in the world.
8	The Happiness Hypothesis	Jonathan Haidt	\N	\N	We might already have encountered the Greatest Idea, the insight that would have transformed us had we savored it, taken it to heart, and worked it into our lives.\nThe foundational idea of this book: The mind is divided into parts that sometimes conflict. Like a rider on the back of an elephant, the conscious, reasoning part of the mind has only limited control of what the elephant does.\n\nI'm a rider on the back of an elephant. I'm holding the reins in my hands, and by pulling one way or the other I can tell the elephant to turn, to stop, or to go. I can direct things, but only when the elephant doesn't have desires of his own. When the elephant really wants to do something, I'm no match for him.\n\nBuddha said, "Our life is the creation of our mind."	The text discusses the concept that the mind is divided into conflicting parts, likening it to a rider on an elephant. The rider represents the conscious reasoning aspect, which has limited control when the elephant (representing subconscious desires) is determined to act in a certain way. The author emphasizes the importance of understanding this dynamic, suggesting that recognizing our internal conflicts can lead to personal transformation. The quote from Buddha reinforces the idea that our lives are shaped by our minds.
9	You Can Negotiate Anything	Herb Cohen	\N	\N	Everything is negotiable. Challenge authority. You have the power in any situation. This is how to realize it and use it. A must-read classic from 1980 from a master negotiator.\nPower is the capacity or ability to get things done.\nIt determines whether you can or can’t influence your environment.\nIt gives you a sense of mastery over your life.\n\nAll power is based on perception.\nIf you think you’ve got it, then you’ve got it.\nYou have more power if you believe you have power and view your life’s encounters as negotiations.\n\nMost people firmly believe that they can’t negotiate.\nThis is a prime example of creating a self-fulfilling prophecy.\n\nForce yourself to go outside your own experience by vigorously testing your assumptions.\nYou’ll discover, to your astonishment, that many of them are false.\n	The text emphasizes that everything is negotiable and encourages individuals to challenge authority and recognize their inherent power in any situation. It highlights that power is tied to perception; believing you have power increases your ability to influence outcomes. Many people mistakenly think they cannot negotiate, leading to a self-fulfilling prophecy. By questioning and testing one's assumptions, individuals can uncover false beliefs and realize their potential in negotiations.
10	The Listening Book	W.A. Mathieu	\N	\N	The eyes are hungry. They eat brain energy. When you close your eyes your brain opens to your ears. When you open your eyes, now the brain is crowded.\nWhen people are listening intently with their eyes open, a strange thing happens. Their eyes roll up a little. It means that the hearing, just for a moment, has become hungrier than the vision.\n\nOur aging cat utters a soft meow of complaint that somehow reminds me of my Grandma Clara, long dead.\nIn the lulls I hear traffic from the through road, two miles north.\nOur dog is lying half-asleep under the quince bush. When he stirs I hear his fur against the grass.\nMy breathing.\nI am now aware of two cicada type of insects, both scraping their knees. In front of me, nearby, is the slower one; the one behind me is faster, but farther away. I don’t know how long they have been singing.\nI absent-mindedly rub the fingers of my left hand together: the high-pitched swish of skin on skin.	The text explores the relationship between vision, hearing, and awareness. It suggests that when eyes are open, the brain is more crowded and focused on visual inputs, which can momentarily diminish auditory perception. The narrator reflects on their surroundings, including memories of their late Grandma Clara, the sounds of traffic, their dog resting, and cicadas, while also noting their own breathing and the subtle sound of rubbing fingers. Overall, it highlights the interconnectedness of sensory experiences and the impact of attention on perception.
11	The Courage to Be Disliked	Ichiro Kishimi and Fumitake Koga	1501197274	A profound little philosophy book from Japan, communicating the psychology of Alfred Adler	No experience is in itself a cause of our success or failure.Nothing is actually determined by those influences.	Success or failure is not solely determined by experience; external influences do not dictate outcomes.
12	The Gardener and the Carpenter	Alison Gopnik	\N	\N	The most important rewards of being a parent come from the moment-by-moment physical and psychological joy of being with this particular child, and in that child’s moment-by-moment joy in being with you.\n\nLove’s purpose is not to shape our beloved’s destiny, but to help them shape their own.	The key rewards of parenting stem from the joyful experiences shared with the child. Love's goal is to support the child in shaping their own destiny rather than impose one on them.
14	Brain Rules for Baby	John Medina	9780983263388	Provides a science backed guide for parents on optimizing child brain development from pregnancy through age five	Brain Rules are what I call the things we know for sure about how the early-childhood brain works.Each one is quarried from the larger seams of behavioral psychology, cellular biology, and molecular biology.The great thing about science is that it takes no sides - and no prisoners. Once you know which research to trust, the big picture emerges and myths fade away.\n\nTo make it into this book, studies must first have been published in the refereed literature and then successfully replicated. Some results have been confirmed dozens of times.	Brain Rules refer to established principles regarding early childhood brain function, drawn from research in behavioral psychology, cellular biology, and molecular biology. The author emphasizes the objectivity of science, highlighting the importance of relying on trustworthy studies that have been peer-reviewed and replicated. Only well-validated research is included in the book, with some findings being confirmed multiple times.
18	The Game of Life and - How to Play It	Florence Scovel Shinn	\N	\N	Her book resonates with dreamers and lovers alike. She emphasizes that being a person of faith can bring more fulfillment than merely practicing faith superficially. When you begin to view life as a game, you’ll discover that it comes with certain rules — following these rules can lead to less stress, greater happiness, and more significant success.\nMoreover, the power of our words is immense; we must be mindful of how we communicate and strive to avoid negativity. Forgiveness is portrayed as one of the higher laws, while love, the most potent force of all, is at the core of our existence. We are all created from love and are meant to embody that love in our lives.\nEmbrace faith, love life, and life will lovingly embrace you back. These principles inspire us to create a fulfilling and joyful existence!	AI summary unavailable right now. Original notes: Her book resonates with dreamers and lovers alike. She emphasizes that being a person of faith can bring more fulfillment than merely practicing faith superficially. When you begin to view life as a g
15	Playful Parenting	Lawrence Cohen	\N	\N	Playful Parenting is a way to enter a child’s world, on the child’s terms, in order to foster closeness, confidence, and connection.\n\nPlay is also the way that children make the world their own.\n\nPlay is also children’s main way of communicating, of experimenting, and of learning.\n\nPlaytime contains multiple levels of meaning.\n\nIt’s a way to release a pile of hurt feelings.\n\nTake out the garbage? Next time try singing the request in a fake-opera voice instead of using the usual nagging tones.\n\nChildren define play as doing whatever you choose.\n\nWhen you can choose what to do, you are more likely to throw yourself into it.\n\nWhen children are discouraged or punished for attempting to recover emotionally in this playful way, they retreat into themselves.\nThe child who had been spanked immediately picked up a stick and went after her little brother. Just in time, Lori grabbed her gently, pulled her aside, took the stick away, and said, in a playful voice, “Ohhhhh no you don’t!” The girl laughed and laughed and wanted to play that game over and over. All thoughts of really whacking her brother were forgotten (for the time being, at least). The mother just stayed close to the child, made sure nobody got whacked, and used a relaxed and playful tone of voice. The little girl did the rest, deciding to play “try to hit the baby” instead of actually hitting him.	\N
17	The 7 Habits of Highly Effective People	Stephen R. Covey	\N	\N	The 7 Habits of Highly Effective People" by Stephen R. Covey provides a transformative guide for personal and professional success. It emphasizes proactive thinking, prioritization, effective communication, collaboration, and personal growth. Covey’s seven habits—being proactive, beginning with the end in mind, putting first things first, thinking win-win, seeking to understand before being understood, synergizing, and sharpening the saw—empower individuals to take control of their lives, align their actions with their values, and build meaningful relationships. By practicing these habits, readers can enhance their effectiveness, achieve their goals, and experience greater fulfillment in all aspects of life.	AI summary unavailable right now. Original notes: The 7 Habits of Highly Effective People" by Stephen R. Covey provides a transformative guide for personal and professional success. It emphasizes proactive thinking, prioritization, effective communic
19	Man’s Search for Meaning 	Viktor Frankl	\N	\N	The book Is just beyond a masterpiece , it feeds your brain, challenges moral value, and most importantly, reconstructs your form of knowledge in defining what life is. This is, by far, a holy grail for those who are stuck in a constant loop of boredom, demotivation, or wondering why we live.	AI summary unavailable right now. Original notes: The book Is just beyond a masterpiece , it feeds your brain, challenges moral value, and most importantly, reconstructs your form of knowledge in defining what life is. This is, by far, a holy grail f
\.


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_seq', 19, true);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: ix_books_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_books_id ON public.books USING btree (id);


--
-- PostgreSQL database dump complete
--

\unrestrict VQXEwLZmpijw9pkWV3VYhWA3hHNtnx0PnVI3kFfrbsYaCC9DSvyWOpM7T9uZNer

