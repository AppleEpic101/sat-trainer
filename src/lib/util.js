export const blacklist = { projection: { password: 0, email: 0, settings: 0, isAdmin: 0 }};

export const generateSkillsArray = (focus, section) => {
    const SKILLS = section === 'Reading' ? READING_SKILLS : MATH_SKILLS;
    const SKILL_LIST = section === 'Reading' ? READING_SKILL_LIST : MATH_SKILL_LIST;

    if (focus === 'All Reading Topics' || focus === 'All Math Topics') {
       return [...SKILL_LIST];
    } else if (SKILLS[focus]) {
        return SKILLS[focus];
    } else {
        return [focus];
    }
}

export const READING_SKILLS = {
    'Information and Ideas': ['Central Ideas and Details', 'Inferences', 'Command of Evidence'],
    'Craft and Structure': [
        'Words in Context',
        'Text Structure and Purpose',
        'Cross-Text Connections'
    ],
    'Expression of Ideas': ['Rhetorical Synthesis', 'Transitions'],
    'Standard English Conventions': ['Boundaries', 'Form, Structure, and Sense']
};

export const READING_DOMAIN_LIST = [
    'Information and Ideas',
    'Craft and Structure',
    'Expression of Ideas',
    'Standard English Conventions'
];

export const READING_SKILL_LIST = [
    'Central Ideas and Details',
    'Inferences',
    'Command of Evidence',
    'Words in Context',
    'Text Structure and Purpose',
    'Cross-Text Connections',
    'Rhetorical Synthesis',
    'Transitions',
    'Boundaries',
    'Form, Structure, and Sense'
]

export const MATH_DOMAIN_LIST = [
    'Algebra',
    'Advanced Math',
    'Problem-Solving and Data Analysis',
    'Geometry and Trigonometry'
];

export const MATH_SKILL_LIST = [
    'Linear equations in one variable',
    'Linear functions',
    'Linear equations in two variables',
    'Systems of two linear equations in two variables',
    'Linear inequalities in one or two variables',
    'Nonlinear functions',
    'Nonlinear equations in one variable and systems of equations in two variables',
    'Equivalent expressions',
    'Ratios, rates, proportional relationships, and units',
    'Percentages',
    'One-variable data: Distributions and measures of center and spread',
    'Two-variable data: Models and scatterplots',
    'Probability and conditional probability',
    'Inference from sample statistics and margin of error',
    'Evaluating statistical claims: Observational studies and experiments',
    'Area and volume',
    'Lines, angles, and triangles',
    'Right triangles and trigonometry',
    'Circles'
];

export const MATH_SKILLS = {
    Algebra: [
        'Linear equations in one variable',
        'Linear functions',
        'Linear equations in two variables',
        'Systems of two linear equations in two variables',
        'Linear inequalities in one or two variables'
    ],
    'Advanced Math': [
        'Nonlinear functions',
        'Nonlinear equations in one variable and systems of equations in two variables',
        'Equivalent expressions'
    ],
    'Problem-Solving and Data Analysis': [
        'Ratios, rates, proportional relationships, and units',
        'Percentages',
        'One-variable data: Distributions and measures of center and spread',
        'Two-variable data: Models and scatterplots',
        'Probability and conditional probability',
        'Inference from sample statistics and margin of error',
        'Evaluating statistical claims: Observational studies and experiments'
    ],
    'Geometry and Trigonometry': [
        'Area and volume',
        'Lines, angles, and triangles',
        'Right triangles and trigonometry',
        'Circles'
    ]
};
