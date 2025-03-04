// Dictionary of English words by length (2-10 letters)
const WORDS: { [key: number]: string[] } = {
  2: ['GO', 'TO', 'IN', 'ON', 'UP', 'BY', 'HE', 'ME', 'MY', 'WE', 'NO', 'SO', 'DO', 'IF', 'OR', 'AT'],
  3: ['THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL', 'ANY', 'CAN', 'HAD', 'HER', 'WAS', 'ONE', 'OUR', 'OUT',
      'DAY', 'GET', 'HAS', 'HIM', 'HIS', 'HOW', 'MAN', 'NEW', 'NOW', 'OLD', 'SEE', 'TWO', 'WAY', 'WHO', 'BOY', 'DID',
      'ITS', 'LET', 'PUT', 'SAY', 'SHE', 'TOO', 'USE', 'SKY', 'RED', 'SUN', 'CAT', 'DOG', 'SEA', 'MAP'],
  4: ['THAT', 'HAVE', 'THIS', 'WILL', 'WHAT', 'THEY', 'FROM', 'BEEN', 'GOOD', 'MUCH', 'SOME', 'TIME', 'VERY', 'WHEN',
      'COME', 'HERE', 'JUST', 'LIKE', 'LONG', 'MAKE', 'MANY', 'MORE', 'ONLY', 'OVER', 'SUCH', 'TAKE', 'THAN', 'THEM',
      'WELL', 'WERE', 'BLUE', 'BOAT', 'BOOK', 'CITY', 'COLD', 'EACH', 'EYES', 'FIND', 'FIRE', 'FISH', 'FIVE', 'FOOD',
      'HAND', 'HOME', 'JUMP', 'KEEP', 'KIND', 'KNOW', 'LAND', 'LAST', 'LIFE', 'LIVE', 'LOVE', 'MOVE', 'NAME', 'NEXT',
      'PLAY', 'READ', 'ROOM', 'SAID', 'SAME', 'SHIP', 'STAR', 'SWIM', 'TREE', 'TRUE', 'TURN', 'WIND', 'WORK', 'YEAR'],
  5: ['ABOUT', 'AFTER', 'AGAIN', 'COULD', 'FIRST', 'FOUND', 'GREAT', 'HOUSE', 'LARGE', 'LEARN', 'NEVER', 'OTHER',
      'PLACE', 'PLANT', 'POINT', 'RIGHT', 'SMALL', 'SOUND', 'SPELL', 'STILL', 'STUDY', 'THEIR', 'THERE', 'THESE',
      'THING', 'THINK', 'THREE', 'WATER', 'WHERE', 'WHICH', 'WORLD', 'WOULD', 'WRITE', 'BEACH', 'BLACK', 'BREAD',
      'BREAK', 'BRING', 'BUILD', 'CARRY', 'CLEAN', 'CLOCK', 'CLOSE', 'COLOR', 'COVER', 'CROSS', 'DANCE', 'DRINK',
      'EARTH', 'EVERY', 'FIGHT', 'FLOOR', 'FORCE', 'HAPPY', 'HEART', 'HORSE', 'LIGHT', 'MONEY', 'MUSIC', 'NIGHT',
      'PAPER', 'PARTY', 'PEACE', 'POWER', 'QUIET', 'RIVER', 'SHAPE', 'SHEEP', 'SHOES', 'SLEEP', 'SPACE', 'STONE',
      'TABLE', 'TIGER', 'TODAY', 'TRAIN', 'WHITE', 'WOMAN', 'OCEAN', 'GREEN'],
  6: ['ALMOST', 'ALWAYS', 'ANIMAL', 'ANSWER', 'BECAME', 'BEFORE', 'BEHIND', 'BETTER', 'BETWEEN', 'CANNOT', 'CHANGE',
      'DECIDE', 'DIFFERENT', 'ENOUGH', 'FAMILY', 'FATHER', 'FRIEND', 'GROUND', 'HAPPEN', 'LETTER', 'LITTLE', 'LIVING',
      'MOTHER', 'PEOPLE', 'PERSON', 'PICTURE', 'REALLY', 'SCHOOL', 'SECOND', 'SHOULD', 'SIMPLE', 'THOUGHT', 'TRAVEL',
      'TRYING', 'WINDOW', 'WONDER', 'YELLOW', 'FOREST', 'GARDEN', 'HEALTH', 'HEAVEN', 'ISLAND', 'JUMPED', 'LAUGHED',
      'MARKET', 'MATTER', 'NATURE', 'NUMBER', 'OBJECT', 'PLANET', 'PLAYED', 'PULLED', 'PUSHED', 'ROCKET', 'SMILED',
      'STARTED', 'TALKED', 'WALKED', 'LOOKED', 'WANTED', 'SECRET', 'SYSTEM'],
  7: ['AGAINST', 'BECAUSE', 'BELIEVE', 'BETWEEN', 'BROTHER', 'BROUGHT', 'CENTURY', 'CERTAIN', 'COUNTRY', 'COVERED',
      'DECIDED', 'EXAMPLE', 'EXPLAIN', 'GENERAL', 'HOWEVER', 'HUNDRED', 'MINUTES', 'NOTHING', 'OUTSIDE', 'PICTURE',
      'PROBLEM', 'QUICKLY', 'REACHED', 'SCIENCE', 'SPECIAL', 'STUDENT', 'SUDDENLY', 'TEACHER', 'THOUGHT', 'THROUGH',
      'TOGETHER', 'USUALLY', 'VILLAGE', 'WEATHER', 'WHETHER', 'WITHOUT', 'WRITING', 'AMAZING', 'ANOTHER', 'CAPTAIN',
      'CENTRAL', 'CHANNEL', 'COMPLEX', 'FREEDOM', 'JOURNEY', 'JUSTICE', 'MACHINE', 'NATURAL', 'QUALITY', 'STRANGE',
      'SUCCESS', 'THUNDER', 'VICTORY', 'WONDER'],
  8: ['ACTUALLY', 'ALTHOUGH', 'ANYTHING', 'BUSINESS', 'CHILDREN', 'COMPLETE', 'CONSIDER', 'CONTINUE', 'DESCRIBE',
      'EVERYONE', 'FAVORITE', 'FINISHED', 'FRIENDLY', 'HAPPENED', 'IMPORTANT', 'INCLUDE', 'MOUNTAIN', 'MOVEMENT',
      'POSSIBLE', 'PROBABLY', 'QUESTION', 'REMEMBER', 'SOUTHERN', 'TOGETHER', 'UNIVERSE', 'AMERICAN', 'BUILDING',
      'CAMPAIGN', 'COMPUTER', 'DARKENED', 'DAUGHTER', 'DECISION', 'DISTANCE', 'EVIDENCE', 'EXCITING', 'FAMILIAR',
      'FOOTBALL', 'FUNCTION', 'HUMIDITY', 'IDENTITY', 'INDUSTRY', 'LANGUAGE', 'LEARNING', 'MATERIAL', 'NATIONAL',
      'ORIGINAL', 'PERSONAL', 'PHYSICAL', 'PLANNING', 'PLATFORM', 'POSITION', 'POSITIVE', 'POWERFUL', 'PRACTICE',
      'RESEARCH', 'SECURITY', 'STANDING', 'STRATEGY', 'STRENGTH', 'STUDENTS', 'THINKING'],
  9: ['ADVANTAGE', 'AFTERNOON', 'BEAUTIFUL', 'CHARACTER', 'COMMITTEE', 'COMMUNITY', 'CONDITION', 'DANGEROUS', 'DETERMINE',
      'DIRECTION', 'EDUCATION', 'EQUIPMENT', 'ESTABLISH', 'EVERYBODY', 'EXERCISE', 'EXPERIENCE', 'GENERALLY',
      'IMPORTANT', 'KNOWLEDGE', 'NECESSARY', 'POLITICAL', 'PRINCIPLE', 'RECOGNIZE', 'REMEMBER', 'SITUATION',
      'SOMETIMES', 'SOMETHING', 'STATEMENT', 'THEREFORE', 'AUTHORITY', 'AVAILABLE', 'CHALLENGE', 'CHEMISTRY',
      'CONFIDENT', 'CORPORATE', 'CREATIVITY', 'CURIOSITY', 'DEMOCRACY', 'DIFFERENT', 'EFFICIENT', 'EMOTIONAL',
      'ESSENTIAL', 'EXCELLENT', 'FANTASTIC', 'FINANCIAL', 'FORTUNATE', 'FRAMEWORK', 'FURNITURE', 'GUARANTEE',
      'HAPPINESS', 'IMPLEMENT', 'INTENTION', 'INTERVIEW', 'LANDSCAPE', 'MARKETING', 'MEDICINE', 'OPERATION',
      'POTENTIAL', 'PRACTICAL', 'PRESIDENT', 'PRINCIPLE', 'PROFESSOR', 'QUESTIONS', 'REFERENCE', 'RESOURCES',
      'SCIENTIST', 'SIGNATURE', 'STRUCTURE', 'SUBSTANCE', 'SURROUND', 'TECHNIQUE', 'TECHNOLOGY', 'TREATMENT',
      'WONDERFUL', 'YESTERDAY'],
  10: ['ADDITIONAL', 'APPEARANCE', 'ASSESSMENT', 'ASSISTANCE', 'ASSOCIATED', 'ATMOSPHERE', 'BACKGROUND', 'COLLECTION',
       'COMMERCIAL', 'COMMISSION', 'CONFERENCE', 'CONFIDENCE', 'CONNECTION', 'CONSIDERED', 'DEPARTMENT', 'DIFFERENCE',
       'DIFFICULTY', 'DISCUSSION', 'ECONOMIC', 'ELECTRONIC', 'EMPLOYMENT', 'EVERYTHING', 'EXPERIENCE', 'EXPRESSION',
       'GOVERNMENT', 'HISTORICAL', 'INDIVIDUAL', 'INDUSTRIAL', 'INFLUENCE', 'MANAGEMENT', 'MECHANICAL', 'NECESSARY',
       'NEWSLETTER', 'OBJECTIVES', 'OPERATIONS', 'OPPOSITION', 'PARTICULAR', 'PROCESSING', 'PRODUCTION', 'PROPERTIES',
       'PROTECTION', 'PSYCHOLOGY', 'REFLECTION', 'REGULATION', 'RESOLUTION', 'RESTAURANT', 'SETTLEMENT', 'SITUATIONS',
       'STRATEGIES', 'SUCCESSFUL', 'SUFFICIENT', 'SUGGESTION', 'TECHNOLOGY', 'TELEVISION', 'TEMPERATURE', 'THEMSELVES',
       'THROUGHOUT', 'UNDERSTAND', 'UNIVERSITY', 'ADVENTURE', 'BRILLIANT', 'CREATIVITY', 'DELICIOUS', 'EVOLUTION',
       'FASCINATING', 'GENERATION', 'HAPPINESS', 'INNOVATION', 'INTEGRITY', 'KNOWLEDGE', 'LEADERSHIP', 'MYSTERIOUS',
       'NUTRITION', 'OPTIMISTIC', 'PASSIONATE', 'POTENTIAL', 'PRINCIPLE', 'QUALIFIED', 'RESILIENCE']
};

/**
 * Gets a random word from the dictionary with length up to the specified maximum
 * @param maxLength Maximum length of the word to get. Defaults to 6 if not specified.
 */
export function getRandomWord(maxLength: number = 6): string {
  // Ensure valid range
  const validMaxLength = Math.min(Math.max(maxLength, 2), 10);
  
  // Get all available lengths up to the specified max
  const availableLengths = Object.keys(WORDS)
    .map(Number)
    .filter(length => length <= validMaxLength);
  
  // Randomly select a length from the available ones
  const randomLengthIndex = Math.floor(Math.random() * availableLengths.length);
  const selectedLength = availableLengths[randomLengthIndex];
  
  // Get a random word of the selected length
  const wordsOfLength = WORDS[selectedLength];
  const randomIndex = Math.floor(Math.random() * wordsOfLength.length);
  return wordsOfLength[randomIndex];
}

/**
 * Checks if a word is in the dictionary
 */
export function isValidWord(word: string): boolean {
  const upperWord = word.toUpperCase();
  const length = upperWord.length;
  
  return WORDS[length] && WORDS[length].includes(upperWord);
}
