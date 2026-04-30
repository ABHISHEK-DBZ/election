import { TimelineStage, CountryData, QuizQuestion, GlossaryItem, CountryKey } from '@/types';

export const COUNTRY_LABELS: Record<CountryKey, string> = {
  us: 'United States',
  in: 'India',
  uk: 'United Kingdom',
  generic: 'How elections work (general)',
};

export const ELECTION_DATA: Record<CountryKey, CountryData> = {
  us: {
    label: 'US Presidential Election — key stages',
    stages: [
      { title: 'Voter Registration', period: '~15 months before election day', description: 'Citizens must register with their state before they can vote. Deadlines vary by state — some allow same-day registration, others require registration 30 days in advance.', tips: ['Check your state\'s deadline at vote.gov', 'You may need to update registration if you moved', 'Some states automatically register you via the DMV'] },
      { title: 'Primary Elections & Caucuses', period: '~6–12 months before general election', description: 'Each major party holds primaries or caucuses across states to select their presidential nominee. Delegates are awarded based on results and then vote at national conventions.', tips: ['Open primaries allow any voter; closed primaries require party membership', 'Iowa, New Hampshire traditionally go first (subject to change)', 'Delegates can be awarded proportionally or winner-takes-all'] },
      { title: 'National Party Conventions', period: '~3–4 months before election day', description: 'Each party formally nominates its presidential and vice-presidential candidates. Delegates vote to confirm the nominee selected through primaries/caucuses.', tips: ['Typically held in summer of election year', 'Party platform — policy positions — is formally adopted', 'Vice-presidential nominee is announced here'] },
      { title: 'General Election Campaign', period: 'Sept – early Nov', description: 'Candidates from all parties campaign nationwide. Presidential debates are held. Campaign finance rules govern fundraising and spending.', tips: ['FEC regulates campaign finance disclosures', 'Super PACs can raise unlimited funds for independent expenditures', 'Swing states receive disproportionate attention'] },
      { title: 'Election Day / Early Voting', period: 'First Tuesday after first Monday in Nov', description: 'Eligible registered voters cast ballots. Many states offer early voting (days/weeks before) and absentee/mail-in voting options.', tips: ['Bring required ID (varies by state)', 'Polls generally open 7 AM – 8 PM local time', 'You can vote if you are in line when polls close'] },
      { title: 'Electoral College Vote', period: '~6 weeks after election day', description: 'Each state\'s electors — equal to its Congressional representation — cast their electoral votes. 270 of 538 electoral votes are needed to win.', tips: ['Most states are winner-takes-all (except Maine & Nebraska)', '538 total electors = 435 House + 100 Senate + 3 DC', 'Faithless electors are rare and may face penalties'] },
      { title: 'Certification & Inauguration', period: 'Jan 6 – Jan 20', description: 'Congress certifies the Electoral College results on January 6. The winner is inaugurated as President on January 20 (Inauguration Day).', tips: ['Vice President presides over the joint session of Congress', 'Results can be objected to — requires majority of both chambers to sustain', 'Oath of office is administered by the Chief Justice'] }
    ]
  },
  in: {
    label: 'Indian General Election (Lok Sabha) — key stages',
    stages: [
      { title: 'Election Commission Announcement', period: '~2–3 months before voting', description: 'The Election Commission of India announces the election schedule, including polling dates for different phases. The Model Code of Conduct comes into force immediately.', tips: ['India often holds elections in multiple phases across different states', 'Model Code of Conduct restricts government policy announcements', 'ECI is a constitutionally independent body'] },
      { title: 'Voter Registration & Roll Updates', period: 'Ongoing; final rolls published ~2 months before', description: 'Citizens 18+ register on the electoral rolls managed by ECI. Voter ID cards (EPIC) serve as primary identification.', tips: ['Register online at voters.eci.gov.in', 'Aadhaar can be linked to voter ID', 'NVSP portal allows corrections to voter data'] },
      { title: 'Nomination & Scrutiny', period: '~4–5 weeks before polling', description: 'Candidates file nomination papers in their constituency. The Returning Officer scrutinizes nominations for eligibility. Candidates can withdraw within a specified period.', tips: ['A security deposit is required (varies by constituency type)', 'Deposits are forfeited if candidate gets less than 1/6 of valid votes', 'Criminal antecedents must be disclosed publicly'] },
      { title: 'Election Campaign', period: 'Until 48 hrs before polling (silence period)', description: 'Parties and candidates campaign across their constituencies. Campaign finance is regulated — candidates have expenditure limits per constituency.', tips: ['Expenditure limits: ₹95 lakh for Lok Sabha seats in larger states', '48-hour silence period before polling begins', 'ECI monitors social media and paid political advertising'] },
      { title: 'Polling Day', period: 'Phase-wise across multiple dates', description: 'Voters cast ballots using Electronic Voting Machines (EVMs) with VVPAT paper trail. India\'s EVM system is considered a global model for reliability.', tips: ['EPIC or any 12 ECI-approved photo IDs accepted at booth', 'Indelible ink is applied to the left index finger', 'Persons with disabilities get priority access and assistance'] },
      { title: 'Vote Counting & Results', period: 'Single day, ~3–6 weeks after last polling phase', description: 'All votes are counted on a single day. Postal ballots are counted first. The candidate with the most votes in each constituency wins (first-past-the-post).', tips: ['543 Lok Sabha seats; 272 seats needed for majority', 'Results are declared constituency by constituency', 'ECI declares the winning party/alliance'] },
      { title: 'Government Formation', period: 'Within days of results', description: 'The President invites the leader of the majority party/coalition to form the government. The Prime Minister is sworn in along with the Council of Ministers.', tips: ['If no party wins outright, coalition negotiations begin', 'Floor test may be required to prove majority', 'Budget session follows the formation of new government'] }
    ]
  },
  uk: {
    label: 'UK General Election — key stages',
    stages: [
      { title: 'Prime Minister Calls Election', period: 'Up to 5 years between elections', description: 'Under the Dissolution and Calling of Parliament Act 2022, the monarch dissolves Parliament on advice of the PM. Election must be held within 25 working days of dissolution.', tips: ['Fixed-term Parliament Act 2011 was repealed in 2022', 'A vote of no confidence can also trigger an election', 'Opposition parties can also call confidence votes'] },
      { title: 'Dissolution of Parliament', period: '25 working days before polling day', description: 'Parliament is formally dissolved. Sitting MPs cease to be members. Caretaker government continues to function in a limited capacity during the election campaign.', tips: ['Civil Service operates under "purdah" restrictions', 'No major policy decisions during election period', 'All 650 House of Commons seats are contested'] },
      { title: 'Candidate Nominations', period: '~3–4 weeks before polling', description: 'Candidates submit nomination papers and a £500 deposit to stand in their constituency. The deadline is typically 19 working days before polling.', tips: ['Deposit returned if candidate wins 5% of votes', 'Candidates do not need party affiliation — independents can stand', 'Electoral registration officers manage nominations locally'] },
      { title: 'Campaign Period', period: '~5 weeks', description: 'Parties and candidates campaign in 650 constituencies across Great Britain and Northern Ireland. Broadcast media must provide balanced coverage under Ofcom rules.', tips: ['Spending limits: ~£30,000 per candidate per constituency', 'National party spending limits also apply', 'BBC and ITV host televised leaders\' debates'] },
      { title: 'Polling Day', period: 'Always a Thursday', description: 'Polls open 7 AM – 10 PM. Photo ID has been required since the Elections Act 2022 (applied from 2023 onwards).', tips: ['Photo ID required since 2023 elections', 'Postal votes and proxy votes available in advance', 'First-Past-The-Post: candidate with most votes wins constituency'] },
      { title: 'Counting & Results', period: 'Overnight / following morning', description: 'Votes are counted locally in each of the 650 constituencies overnight. Results are declared constituency by constituency, with broadcasters calling the election when majority is clear.', tips: ['Sunderland Central traditionally first to declare results', '326 seats needed for overall majority', 'Exit polls published at 10 PM are usually highly accurate'] },
      { title: 'Government Formation', period: 'Day after election', description: 'The monarch invites the leader of the party that can command a Commons majority to form a government. The new Prime Minister moves into 10 Downing Street typically the day after.', tips: ['Outgoing PM resigns before the new PM\'s appointment', 'A hung parliament may require coalition negotiations', 'The King\'s Speech sets out the new government\'s agenda'] }
    ]
  },
  generic: {
    label: 'How elections work — universal principles',
    stages: [
      { title: 'Electoral Framework', period: 'Permanent infrastructure', description: 'Every democracy has laws, institutions, and rules governing elections. An independent electoral management body (EMB) oversees the process to ensure fairness.', tips: ['EMBs should be independent of the ruling government', 'Electoral laws define who can vote, stand, and how votes are counted', 'International standards exist (UN, EU, Carter Center) for free and fair elections'] },
      { title: 'Voter Registration', period: 'Before the election period', description: 'Citizens establish their eligibility to vote. Some countries automatically register all eligible citizens; others require active registration.', tips: ['Automatic registration reduces disenfranchisement', 'Residency and citizenship requirements vary widely', 'Electoral rolls must be updated regularly to remain accurate'] },
      { title: 'Candidacy & Party Formation', period: 'Months before election day', description: 'Individuals and parties declare their intention to stand for election. Most systems require candidates to meet eligibility criteria and submit formal nominations.', tips: ['Age minimums for candidacy are often higher than voting age', 'Security deposits deter frivolous candidates in some systems', 'Political parties must usually be officially registered'] },
      { title: 'Campaign & Debate', period: 'Weeks to months before voting', description: 'Candidates and parties communicate their platforms to voters. Free, fair campaigning — including freedom of speech and assembly — is essential to democracy.', tips: ['Campaign finance transparency reduces corruption', 'Media freedom is critical for informed voter choice', 'Debates allow direct comparison of candidates'] },
      { title: 'Casting Votes', period: 'Election day (or early voting period)', description: 'Eligible voters cast secret ballots. The secret ballot protects voters from coercion and intimidation. Various methods include paper ballots, EVMs, and postal/mail voting.', tips: ['Secret ballot is a cornerstone of democratic integrity', 'Accessibility accommodations should be provided', 'International observers monitor the process in many countries'] },
      { title: 'Counting & Verification', period: 'After polls close', description: 'Ballots are counted — publicly and transparently where possible. Results are verified, with opportunities for legitimate challenges if irregularities are alleged.', tips: ['Transparency in counting builds public confidence', 'Chain of custody for ballots must be documented', 'Parallel vote tabulation by observers cross-checks official counts'] },
      { title: 'Certification & Transfer of Power', period: 'After results are confirmed', description: 'Official results are certified by the electoral authority. The peaceful transfer of power from outgoing to incoming elected officials is the hallmark of a healthy democracy.', tips: ['Loser concession is a democratic norm, not a legal requirement', 'Courts may adjudicate election disputes', 'International recognition of results matters for new governments'] }
    ]
  }
};

export const QUIZZES: Record<CountryKey, QuizQuestion[]> = {
  us: [
    { question: 'How many Electoral College votes are needed to win the US presidency?', options: ['269', '270', '271', '300'], correctIdx: 1, explanation: 'A candidate needs 270 of 538 total electoral votes. The 538 comes from 435 House members + 100 Senators + 3 DC electors (from the 23rd Amendment).' },
    { question: 'When is US Election Day held?', options: ['First Monday in November', 'First Tuesday in November', 'First Tuesday after first Monday in November', 'Second Tuesday in November'], correctIdx: 2, explanation: 'Federal law sets Election Day as the first Tuesday after the first Monday in November. This was established in 1845.' },
    { question: 'What is a "primary election"?', options: ['The main general election', 'A party election to choose its nominee', 'An election for local offices only', 'A rehearsal election'], correctIdx: 1, explanation: 'A primary election is a party-run process where registered voters choose the party\'s candidate for the general election.' },
    { question: 'Which two states award Electoral votes proportionally rather than winner-takes-all?', options: ['Florida and Ohio', 'Maine and Nebraska', 'Texas and California', 'Virginia and Pennsylvania'], correctIdx: 1, explanation: 'Maine and Nebraska use the Congressional District Method — they award two electors to the statewide winner and one to the winner of each congressional district.' },
    { question: 'What is the purpose of Super Tuesday?', options: ['To elect the President directly', 'A day when many states hold primaries simultaneously', 'The day electoral college votes are cast', 'The day of the State of the Union'], correctIdx: 1, explanation: 'Super Tuesday is a day when a large number of states hold their presidential primary elections on the same date, making it one of the most consequential days in the primary calendar.' }
  ],
  in: [
    { question: 'How many seats are in the Lok Sabha?', options: ['543', '552', '545', '500'], correctIdx: 0, explanation: '543 seats are directly elected. The Constitution originally allowed 2 Anglo-Indian nominated seats, but the 104th Amendment (2020) removed this provision.' },
    { question: 'What does EVM stand for in Indian elections?', options: ['Election Verification Machine', 'Electronic Voting Machine', 'Electoral Vote Monitor', 'Election Value Meter'], correctIdx: 1, explanation: 'EVM stands for Electronic Voting Machine. India introduced EVMs in 1982 in Parur, Kerala. They are now used universally and come with VVPAT.' },
    { question: 'Which body conducts Indian general elections?', options: ['Ministry of Home Affairs', 'Supreme Court of India', 'Election Commission of India', 'Parliament of India'], correctIdx: 2, explanation: 'The Election Commission of India (ECI) is a constitutional body under Article 324. It is independent of the government.' },
    { question: 'What is the Model Code of Conduct?', options: ['A dress code for politicians', 'Rules restricting government/party actions during election period', 'A code of conduct for voters', 'Rules for election observers'], correctIdx: 1, explanation: 'The Model Code of Conduct (MCC) is a set of guidelines issued by ECI that restricts the ruling party from making policy decisions that could give them an electoral advantage.' },
    { question: 'What percentage of valid votes must a candidate receive to get their deposit back?', options: ['1/10th', '1/8th', '1/6th', '1/4th'], correctIdx: 2, explanation: 'A candidate must secure at least one-sixth (1/6th) of the total valid votes polled in their constituency to have their security deposit returned.' }
  ],
  uk: [
    { question: 'How many seats are there in the UK House of Commons?', options: ['600', '625', '650', '675'], correctIdx: 2, explanation: '650 constituencies each elect one MP to the House of Commons.' },
    { question: 'What voting system does the UK use for general elections?', options: ['Proportional representation', 'First Past the Post', 'Alternative vote', 'Ranked choice voting'], correctIdx: 1, explanation: 'The UK uses First Past the Post (FPTP) — the candidate with the most votes in each constituency wins.' },
    { question: 'On which day of the week are UK general elections always held?', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], correctIdx: 3, explanation: 'UK general elections are traditionally held on Thursdays. This convention started in the 1930s.' },
    { question: 'What is a "hung parliament"?', options: ['Parliament that has been suspended', 'No single party has an overall majority', 'A parliament in session during a crisis', 'A parliament with no opposition'], correctIdx: 1, explanation: 'A hung parliament occurs when no single party wins enough seats (326+ out of 650) to command an overall majority.' },
    { question: 'What does "purdah" mean in a UK election context?', options: ['Ballot secrecy rules', 'Pre-election restrictions on civil servants and government', 'Campaign spending limits', 'Media broadcasting rules'], correctIdx: 1, explanation: 'Purdah is the pre-election period during which civil servants and government departments restrict their activities to avoid influencing the election.' }
  ],
  generic: [
    { question: 'What is the secret ballot designed to protect?', options: ['The identity of candidates', 'Voters from coercion and intimidation', 'The identity of election officials', 'The location of polling stations'], correctIdx: 1, explanation: 'The secret ballot ensures no one can see how an individual voted, protecting voters from being pressured or penalised.' },
    { question: 'What is "first past the post" voting?', options: ['The first candidate to register wins', 'The candidate with the most votes wins, regardless of majority', 'Votes are counted in order of preference', 'Candidates must win 50%+1 votes'], correctIdx: 1, explanation: 'First Past the Post (FPTP) means the candidate with the most votes wins — even if that is less than 50%.' },
    { question: 'What is the role of an independent electoral management body (EMB)?', options: ['To campaign for the ruling party', 'To oversee elections impartially and implement electoral laws', 'To set government policy during elections', 'To determine which parties can exist'], correctIdx: 1, explanation: 'An independent EMB oversees the election process without favouring any political party.' },
    { question: 'What is "voter suppression"?', options: ['Low voter turnout due to bad weather', 'Deliberate efforts to prevent eligible people from voting', 'Overseas voters unable to cast ballots', 'Voters choosing not to participate'], correctIdx: 1, explanation: 'Voter suppression refers to deliberate strategies designed to make it harder for certain groups of eligible voters to exercise their right to vote.' },
    { question: 'What is "proportional representation" (PR)?', options: ['A system where rural votes count more', 'Seats allocated based on each party\'s share of the total vote', 'Each candidate gets equal funding', 'All citizens must vote'], correctIdx: 1, explanation: 'Proportional representation is an electoral system where parties gain seats in proportion to the percentage of votes they receive.' }
  ]
};

export const GLOSSARY: GlossaryItem[] = [
  { term: 'Ballot', definition: 'The form (paper or digital) on which a voter records their choice.' },
  { term: 'By-election', definition: 'An election held between general elections to fill a vacant seat.' },
  { term: 'Caucus', definition: 'A meeting where party members gather to select candidates through discussion and public grouping.' },
  { term: 'Constituency', definition: 'A defined geographic area that elects one or more representatives.' },
  { term: 'Delegate', definition: 'A person authorized to represent their state/region at a party convention.' },
  { term: 'Disenfranchisement', definition: 'The removal or restriction of a person\'s right to vote.' },
  { term: 'Electoral roll', definition: 'The official list of all eligible registered voters in a jurisdiction.' },
  { term: 'Exit poll', definition: 'A survey of voters conducted just after they have cast their ballot, used to predict results.' },
  { term: 'Gerrymandering', definition: 'Manipulating electoral district boundaries to favour one party or group.' },
  { term: 'Hung parliament', definition: 'When no single party wins enough seats to form a majority government alone.' },
  { term: 'Incumbent', definition: 'A politician or party currently holding a seat or office.' },
  { term: 'Manifesto', definition: 'A published statement of a party\'s policies and intentions if elected.' },
  { term: 'Marginal seat', definition: 'A constituency where the winning margin is very small — highly competitive.' },
  { term: 'Plurality', definition: 'Winning more votes than any other candidate, without necessarily a majority.' },
  { term: 'Preferential voting', definition: 'Voters rank candidates in order of preference; also called ranked choice voting.' },
  { term: 'Proportional rep.', definition: 'An electoral system where seats are distributed proportionally to vote share.' },
  { term: 'Swing state', definition: 'A state where both major parties have a real chance of winning (US context).' },
  { term: 'Turnout', definition: 'The percentage of eligible voters who actually cast a ballot in an election.' },
  { term: 'Veto', definition: 'The power of one branch of government to block legislation passed by another.' },
  { term: 'Writ of election', definition: 'An official order authorizing and setting the date for an election.' }
];
