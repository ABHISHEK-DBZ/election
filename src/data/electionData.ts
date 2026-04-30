// =============================================
// CivicFlow 2.0 — Election Process Education Data
// Multi-country election timelines, quizzes, and glossary
// =============================================

export interface ElectionStage {
  title: string;
  timing: string;
  color: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  desc: string;
  tips: string[];
}

export interface CountryData {
  label: string;
  stages: ElectionStage[];
}

export interface QuizQuestion {
  q: string;
  opts: string[];
  ans: number;
  exp: string;
}

export interface GlossaryItem {
  term: string;
  def: string;
}

export type CountryKey = 'us' | 'in' | 'uk' | 'generic';

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
      { title: 'Voter Registration', timing: '~15 months before election day', color: '#378ADD', badge: 'First step', badgeBg: '#E6F1FB', badgeColor: '#185FA5', desc: 'Citizens must register with their state before they can vote. Deadlines vary by state — some allow same-day registration, others require registration 30 days in advance.', tips: ['Check your state\'s deadline at vote.gov', 'You may need to update registration if you moved', 'Some states automatically register you via the DMV'] },
      { title: 'Primary Elections & Caucuses', timing: '~6–12 months before general election', color: '#1D9E75', badge: 'Party selection', badgeBg: '#E1F5EE', badgeColor: '#0F6E56', desc: 'Each major party holds primaries or caucuses across states to select their presidential nominee. Delegates are awarded based on results and then vote at national conventions.', tips: ['Open primaries allow any voter; closed primaries require party membership', 'Iowa, New Hampshire traditionally go first (subject to change)', 'Delegates can be awarded proportionally or winner-takes-all'] },
      { title: 'National Party Conventions', timing: '~3–4 months before election day', color: '#D85A30', badge: 'Nomination', badgeBg: '#FAECE7', badgeColor: '#993C1D', desc: 'Each party formally nominates its presidential and vice-presidential candidates. Delegates vote to confirm the nominee selected through primaries/caucuses.', tips: ['Typically held in summer of election year', 'Party platform — policy positions — is formally adopted', 'Vice-presidential nominee is announced here'] },
      { title: 'General Election Campaign', timing: 'Sept – early Nov', color: '#BA7517', badge: 'Campaign period', badgeBg: '#FAEEDA', badgeColor: '#854F0B', desc: 'Candidates from all parties campaign nationwide. Presidential debates are held. Campaign finance rules govern fundraising and spending.', tips: ['FEC regulates campaign finance disclosures', 'Super PACs can raise unlimited funds for independent expenditures', 'Swing states receive disproportionate attention'] },
      { title: 'Election Day / Early Voting', timing: 'First Tuesday after first Monday in Nov', color: '#534AB7', badge: 'Voting', badgeBg: '#EEEDFE', badgeColor: '#3C3489', desc: 'Eligible registered voters cast ballots. Many states offer early voting (days/weeks before) and absentee/mail-in voting options.', tips: ['Bring required ID (varies by state)', 'Polls generally open 7 AM – 8 PM local time', 'You can vote if you are in line when polls close'] },
      { title: 'Electoral College Vote', timing: '~6 weeks after election day', color: '#639922', badge: 'Formal vote', badgeBg: '#EAF3DE', badgeColor: '#3B6D11', desc: 'Each state\'s electors — equal to its Congressional representation — cast their electoral votes. 270 of 538 electoral votes are needed to win.', tips: ['Most states are winner-takes-all (except Maine & Nebraska)', '538 total electors = 435 House + 100 Senate + 3 DC', 'Faithless electors are rare and may face penalties'] },
      { title: 'Certification & Inauguration', timing: 'Jan 6 – Jan 20', color: '#888780', badge: 'Official', badgeBg: '#F1EFE8', badgeColor: '#5F5E5A', desc: 'Congress certifies the Electoral College results on January 6. The winner is inaugurated as President on January 20 (Inauguration Day).', tips: ['Vice President presides over the joint session of Congress', 'Results can be objected to — requires majority of both chambers to sustain', 'Oath of office is administered by the Chief Justice'] }
    ]
  },
  in: {
    label: 'Indian General Election (Lok Sabha) — key stages',
    stages: [
      { title: 'Election Commission Announcement', timing: '~2–3 months before voting', color: '#378ADD', badge: 'Launch', badgeBg: '#E6F1FB', badgeColor: '#185FA5', desc: 'The Election Commission of India announces the election schedule, including polling dates for different phases. The Model Code of Conduct comes into force immediately.', tips: ['India often holds elections in multiple phases across different states', 'Model Code of Conduct restricts government policy announcements', 'ECI is a constitutionally independent body'] },
      { title: 'Voter Registration & Roll Updates', timing: 'Ongoing; final rolls published ~2 months before', color: '#1D9E75', badge: 'Eligibility', badgeBg: '#E1F5EE', badgeColor: '#0F6E56', desc: 'Citizens 18+ register on the electoral rolls managed by ECI. Voter ID cards (EPIC) serve as primary identification.', tips: ['Register online at voters.eci.gov.in', 'Aadhaar can be linked to voter ID', 'NVSP portal allows corrections to voter data'] },
      { title: 'Nomination & Scrutiny', timing: '~4–5 weeks before polling', color: '#D85A30', badge: 'Candidates', badgeBg: '#FAECE7', badgeColor: '#993C1D', desc: 'Candidates file nomination papers in their constituency. The Returning Officer scrutinizes nominations for eligibility. Candidates can withdraw within a specified period.', tips: ['A security deposit is required (varies by constituency type)', 'Deposits are forfeited if candidate gets less than 1/6 of valid votes', 'Criminal antecedents must be disclosed publicly'] },
      { title: 'Election Campaign', timing: 'Until 48 hrs before polling (silence period)', color: '#BA7517', badge: 'Campaigning', badgeBg: '#FAEEDA', badgeColor: '#854F0B', desc: 'Parties and candidates campaign across their constituencies. Campaign finance is regulated — candidates have expenditure limits per constituency.', tips: ['Expenditure limits: ₹95 lakh for Lok Sabha seats in larger states', '48-hour silence period before polling begins', 'ECI monitors social media and paid political advertising'] },
      { title: 'Polling Day', timing: 'Phase-wise across multiple dates', color: '#534AB7', badge: 'Voting', badgeBg: '#EEEDFE', badgeColor: '#3C3489', desc: 'Voters cast ballots using Electronic Voting Machines (EVMs) with VVPAT paper trail. India\'s EVM system is considered a global model for reliability.', tips: ['EPIC or any 12 ECI-approved photo IDs accepted at booth', 'Indelible ink is applied to the left index finger', 'Persons with disabilities get priority access and assistance'] },
      { title: 'Vote Counting & Results', timing: 'Single day, ~3–6 weeks after last polling phase', color: '#639922', badge: 'Results', badgeBg: '#EAF3DE', badgeColor: '#3B6D11', desc: 'All votes are counted on a single day. Postal ballots are counted first. The candidate with the most votes in each constituency wins (first-past-the-post).', tips: ['543 Lok Sabha seats; 272 seats needed for majority', 'Results are declared constituency by constituency', 'ECI declares the winning party/alliance'] },
      { title: 'Government Formation', timing: 'Within days of results', color: '#888780', badge: 'Outcome', badgeBg: '#F1EFE8', badgeColor: '#5F5E5A', desc: 'The President invites the leader of the majority party/coalition to form the government. The Prime Minister is sworn in along with the Council of Ministers.', tips: ['If no party wins outright, coalition negotiations begin', 'Floor test may be required to prove majority', 'Budget session follows the formation of new government'] }
    ]
  },
  uk: {
    label: 'UK General Election — key stages',
    stages: [
      { title: 'Prime Minister Calls Election', timing: 'Up to 5 years between elections', color: '#378ADD', badge: 'Trigger', badgeBg: '#E6F1FB', badgeColor: '#185FA5', desc: 'Under the Dissolution and Calling of Parliament Act 2022, the monarch dissolves Parliament on advice of the PM. Election must be held within 25 working days of dissolution.', tips: ['Fixed-term Parliament Act 2011 was repealed in 2022', 'A vote of no confidence can also trigger an election', 'Opposition parties can also call confidence votes'] },
      { title: 'Dissolution of Parliament', timing: '25 working days before polling day', color: '#1D9E75', badge: 'Formal start', badgeBg: '#E1F5EE', badgeColor: '#0F6E56', desc: 'Parliament is formally dissolved. Sitting MPs cease to be members. Caretaker government continues to function in a limited capacity during the election campaign.', tips: ['Civil Service operates under "purdah" restrictions', 'No major policy decisions during election period', 'All 650 House of Commons seats are contested'] },
      { title: 'Candidate Nominations', timing: '~3–4 weeks before polling', color: '#D85A30', badge: 'Candidates', badgeBg: '#FAECE7', badgeColor: '#993C1D', desc: 'Candidates submit nomination papers and a £500 deposit to stand in their constituency. The deadline is typically 19 working days before polling.', tips: ['Deposit returned if candidate wins 5% of votes', 'Candidates do not need party affiliation — independents can stand', 'Electoral registration officers manage nominations locally'] },
      { title: 'Campaign Period', timing: '~5 weeks', color: '#BA7517', badge: 'Campaign', badgeBg: '#FAEEDA', badgeColor: '#854F0B', desc: 'Parties and candidates campaign in 650 constituencies across Great Britain and Northern Ireland. Broadcast media must provide balanced coverage under Ofcom rules.', tips: ['Spending limits: ~£30,000 per candidate per constituency', 'National party spending limits also apply', 'BBC and ITV host televised leaders\' debates'] },
      { title: 'Polling Day', timing: 'Always a Thursday', color: '#534AB7', badge: 'Voting', badgeBg: '#EEEDFE', badgeColor: '#3C3489', desc: 'Polls open 7 AM – 10 PM. Photo ID has been required since the Elections Act 2022 (applied from 2023 onwards).', tips: ['Photo ID required since 2023 elections', 'Postal votes and proxy votes available in advance', 'First-Past-The-Post: candidate with most votes wins constituency'] },
      { title: 'Counting & Results', timing: 'Overnight / following morning', color: '#639922', badge: 'Results', badgeBg: '#EAF3DE', badgeColor: '#3B6D11', desc: 'Votes are counted locally in each of the 650 constituencies overnight. Results are declared constituency by constituency, with broadcasters calling the election when majority is clear.', tips: ['Sunderland Central traditionally first to declare results', '326 seats needed for overall majority', 'Exit polls published at 10 PM are usually highly accurate'] },
      { title: 'Government Formation', timing: 'Day after election', color: '#888780', badge: 'Outcome', badgeBg: '#F1EFE8', badgeColor: '#5F5E5A', desc: 'The monarch invites the leader of the party that can command a Commons majority to form a government. The new Prime Minister moves into 10 Downing Street typically the day after.', tips: ['Outgoing PM resigns before the new PM\'s appointment', 'A hung parliament may require coalition negotiations', 'The King\'s Speech sets out the new government\'s agenda'] }
    ]
  },
  generic: {
    label: 'How elections work — universal principles',
    stages: [
      { title: 'Electoral Framework', timing: 'Permanent infrastructure', color: '#378ADD', badge: 'Foundation', badgeBg: '#E6F1FB', badgeColor: '#185FA5', desc: 'Every democracy has laws, institutions, and rules governing elections. An independent electoral management body (EMB) oversees the process to ensure fairness.', tips: ['EMBs should be independent of the ruling government', 'Electoral laws define who can vote, stand, and how votes are counted', 'International standards exist (UN, EU, Carter Center) for free and fair elections'] },
      { title: 'Voter Registration', timing: 'Before the election period', color: '#1D9E75', badge: 'Eligibility', badgeBg: '#E1F5EE', badgeColor: '#0F6E56', desc: 'Citizens establish their eligibility to vote. Some countries automatically register all eligible citizens; others require active registration.', tips: ['Automatic registration reduces disenfranchisement', 'Residency and citizenship requirements vary widely', 'Electoral rolls must be updated regularly to remain accurate'] },
      { title: 'Candidacy & Party Formation', timing: 'Months before election day', color: '#D85A30', badge: 'Candidates', badgeBg: '#FAECE7', badgeColor: '#993C1D', desc: 'Individuals and parties declare their intention to stand for election. Most systems require candidates to meet eligibility criteria and submit formal nominations.', tips: ['Age minimums for candidacy are often higher than voting age', 'Security deposits deter frivolous candidates in some systems', 'Political parties must usually be officially registered'] },
      { title: 'Campaign & Debate', timing: 'Weeks to months before voting', color: '#BA7517', badge: 'Campaign', badgeBg: '#FAEEDA', badgeColor: '#854F0B', desc: 'Candidates and parties communicate their platforms to voters. Free, fair campaigning — including freedom of speech and assembly — is essential to democracy.', tips: ['Campaign finance transparency reduces corruption', 'Media freedom is critical for informed voter choice', 'Debates allow direct comparison of candidates'] },
      { title: 'Casting Votes', timing: 'Election day (or early voting period)', color: '#534AB7', badge: 'Voting', badgeBg: '#EEEDFE', badgeColor: '#3C3489', desc: 'Eligible voters cast secret ballots. The secret ballot protects voters from coercion and intimidation. Various methods include paper ballots, EVMs, and postal/mail voting.', tips: ['Secret ballot is a cornerstone of democratic integrity', 'Accessibility accommodations should be provided', 'International observers monitor the process in many countries'] },
      { title: 'Counting & Verification', timing: 'After polls close', color: '#639922', badge: 'Results', badgeBg: '#EAF3DE', badgeColor: '#3B6D11', desc: 'Ballots are counted — publicly and transparently where possible. Results are verified, with opportunities for legitimate challenges if irregularities are alleged.', tips: ['Transparency in counting builds public confidence', 'Chain of custody for ballots must be documented', 'Parallel vote tabulation by observers cross-checks official counts'] },
      { title: 'Certification & Transfer of Power', timing: 'After results are confirmed', color: '#888780', badge: 'Handover', badgeBg: '#F1EFE8', badgeColor: '#5F5E5A', desc: 'Official results are certified by the electoral authority. The peaceful transfer of power from outgoing to incoming elected officials is the hallmark of a healthy democracy.', tips: ['Loser concession is a democratic norm, not a legal requirement', 'Courts may adjudicate election disputes', 'International recognition of results matters for new governments'] }
    ]
  }
};

export const QUIZZES: Record<CountryKey, QuizQuestion[]> = {
  us: [
    { q: 'How many Electoral College votes are needed to win the US presidency?', opts: ['269', '270', '271', '300'], ans: 1, exp: 'A candidate needs 270 of 538 total electoral votes. The 538 comes from 435 House members + 100 Senators + 3 DC electors (from the 23rd Amendment).' },
    { q: 'When is US Election Day held?', opts: ['First Monday in November', 'First Tuesday in November', 'First Tuesday after first Monday in November', 'Second Tuesday in November'], ans: 2, exp: 'Federal law sets Election Day as the first Tuesday after the first Monday in November. This was established in 1845.' },
    { q: 'What is a "primary election"?', opts: ['The main general election', 'A party election to choose its nominee', 'An election for local offices only', 'A rehearsal election'], ans: 1, exp: 'A primary election is a party-run process where registered voters choose the party\'s candidate for the general election.' },
    { q: 'Which two states award Electoral votes proportionally rather than winner-takes-all?', opts: ['Florida and Ohio', 'Maine and Nebraska', 'Texas and California', 'Virginia and Pennsylvania'], ans: 1, exp: 'Maine and Nebraska use the Congressional District Method — they award two electors to the statewide winner and one to the winner of each congressional district.' },
    { q: 'What is the purpose of Super Tuesday?', opts: ['To elect the President directly', 'A day when many states hold primaries simultaneously', 'The day electoral college votes are cast', 'The day of the State of the Union'], ans: 1, exp: 'Super Tuesday is a day when a large number of states hold their presidential primary elections on the same date, making it one of the most consequential days in the primary calendar.' }
  ],
  in: [
    { q: 'How many seats are in the Lok Sabha?', opts: ['543', '552', '545', '500'], ans: 0, exp: '543 seats are directly elected. The Constitution originally allowed 2 Anglo-Indian nominated seats, but the 104th Amendment (2020) removed this provision.' },
    { q: 'What does EVM stand for in Indian elections?', opts: ['Election Verification Machine', 'Electronic Voting Machine', 'Electoral Vote Monitor', 'Election Value Meter'], ans: 1, exp: 'EVM stands for Electronic Voting Machine. India introduced EVMs in 1982 in Parur, Kerala. They are now used universally and come with VVPAT.' },
    { q: 'Which body conducts Indian general elections?', opts: ['Ministry of Home Affairs', 'Supreme Court of India', 'Election Commission of India', 'Parliament of India'], ans: 2, exp: 'The Election Commission of India (ECI) is a constitutional body under Article 324. It is independent of the government.' },
    { q: 'What is the Model Code of Conduct?', opts: ['A dress code for politicians', 'Rules restricting government/party actions during election period', 'A code of conduct for voters', 'Rules for election observers'], ans: 1, exp: 'The Model Code of Conduct (MCC) is a set of guidelines issued by ECI that restricts the ruling party from making policy decisions that could give them an electoral advantage.' },
    { q: 'What percentage of valid votes must a candidate receive to get their deposit back?', opts: ['1/10th', '1/8th', '1/6th', '1/4th'], ans: 2, exp: 'A candidate must secure at least one-sixth (1/6th) of the total valid votes polled in their constituency to have their security deposit returned.' }
  ],
  uk: [
    { q: 'How many seats are there in the UK House of Commons?', opts: ['600', '625', '650', '675'], ans: 2, exp: '650 constituencies each elect one MP to the House of Commons.' },
    { q: 'What voting system does the UK use for general elections?', opts: ['Proportional representation', 'First Past the Post', 'Alternative vote', 'Ranked choice voting'], ans: 1, exp: 'The UK uses First Past the Post (FPTP) — the candidate with the most votes in each constituency wins.' },
    { q: 'On which day of the week are UK general elections always held?', opts: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], ans: 3, exp: 'UK general elections are traditionally held on Thursdays. This convention started in the 1930s.' },
    { q: 'What is a "hung parliament"?', opts: ['Parliament that has been suspended', 'No single party has an overall majority', 'A parliament in session during a crisis', 'A parliament with no opposition'], ans: 1, exp: 'A hung parliament occurs when no single party wins enough seats (326+ out of 650) to command an overall majority.' },
    { q: 'What does "purdah" mean in a UK election context?', opts: ['Ballot secrecy rules', 'Pre-election restrictions on civil servants and government', 'Campaign spending limits', 'Media broadcasting rules'], ans: 1, exp: 'Purdah is the pre-election period during which civil servants and government departments restrict their activities to avoid influencing the election.' }
  ],
  generic: [
    { q: 'What is the secret ballot designed to protect?', opts: ['The identity of candidates', 'Voters from coercion and intimidation', 'The identity of election officials', 'The location of polling stations'], ans: 1, exp: 'The secret ballot ensures no one can see how an individual voted, protecting voters from being pressured or penalised.' },
    { q: 'What is "first past the post" voting?', opts: ['The first candidate to register wins', 'The candidate with the most votes wins, regardless of majority', 'Votes are counted in order of preference', 'Candidates must win 50%+1 votes'], ans: 1, exp: 'First Past the Post (FPTP) means the candidate with the most votes wins — even if that is less than 50%.' },
    { q: 'What is the role of an independent electoral management body (EMB)?', opts: ['To campaign for the ruling party', 'To oversee elections impartially and implement electoral laws', 'To set government policy during elections', 'To determine which parties can exist'], ans: 1, exp: 'An independent EMB oversees the election process without favouring any political party.' },
    { q: 'What is "voter suppression"?', opts: ['Low voter turnout due to bad weather', 'Deliberate efforts to prevent eligible people from voting', 'Overseas voters unable to cast ballots', 'Voters choosing not to participate'], ans: 1, exp: 'Voter suppression refers to deliberate strategies designed to make it harder for certain groups of eligible voters to exercise their right to vote.' },
    { q: 'What is proportional representation (PR)?', opts: ['A system where rural votes count more', 'Seats allocated based on each party\'s share of the total vote', 'Each candidate gets equal funding', 'All citizens must vote'], ans: 1, exp: 'Proportional representation is an electoral system where parties gain seats in proportion to the percentage of votes they receive.' }
  ]
};

export const GLOSSARY: GlossaryItem[] = [
  { term: 'Ballot', def: 'The form (paper or digital) on which a voter records their choice.' },
  { term: 'By-election', def: 'An election held between general elections to fill a vacant seat.' },
  { term: 'Caucus', def: 'A meeting where party members gather to select candidates through discussion and public grouping.' },
  { term: 'Constituency', def: 'A defined geographic area that elects one or more representatives.' },
  { term: 'Delegate', def: 'A person authorized to represent their state/region at a party convention.' },
  { term: 'Disenfranchisement', def: 'The removal or restriction of a person\'s right to vote.' },
  { term: 'Electoral roll', def: 'The official list of all eligible registered voters in a jurisdiction.' },
  { term: 'Exit poll', def: 'A survey of voters conducted just after they have cast their ballot, used to predict results.' },
  { term: 'Gerrymandering', def: 'Manipulating electoral district boundaries to favour one party or group.' },
  { term: 'Hung parliament', def: 'When no single party wins enough seats to form a majority government alone.' },
  { term: 'Incumbent', def: 'A politician or party currently holding a seat or office.' },
  { term: 'Manifesto', def: 'A published statement of a party\'s policies and intentions if elected.' },
  { term: 'Marginal seat', def: 'A constituency where the winning margin is very small — highly competitive.' },
  { term: 'Plurality', def: 'Winning more votes than any other candidate, without necessarily a majority.' },
  { term: 'Preferential voting', def: 'Voters rank candidates in order of preference; also called ranked choice voting.' },
  { term: 'Proportional rep.', def: 'An electoral system where seats are distributed proportionally to vote share.' },
  { term: 'Swing state', def: 'A state where both major parties have a real chance of winning (US context).' },
  { term: 'Turnout', def: 'The percentage of eligible voters who actually cast a ballot in an election.' },
  { term: 'Veto', def: 'The power of one branch of government to block legislation passed by another.' },
  { term: 'Writ of election', def: 'An official order authorizing and setting the date for an election.' }
];
