import type { Level, Stage, StageId } from './types';

/** Listed from the finished record back to the idea: the guide works backwards. */
export const STAGES: Stage[] = [
  {
    id: 'release',
    n: 8,
    name: 'The record',
    done: 'A song that grabs in the first ten seconds, holds through the chorus, and clears the platform rules for AI music.',
    ask: 'What does a finished, releasable song have, and what are the rules for putting it out?',
  },
  {
    id: 'master',
    n: 7,
    name: 'Master',
    done: 'Competitive loudness without squashing, a balanced tone next to a reference track, clean peaks for every platform.',
    ask: 'How do I make it sound finished and as loud as the songs it sits next to?',
  },
  {
    id: 'mix',
    n: 6,
    name: 'Mix',
    done: 'A vocal that sits in front, a tight low end, width without phase problems, and no AI shimmer in the top end.',
    ask: 'How do I turn generated audio into a mix that sounds expensive?',
  },
  {
    id: 'stems',
    n: 5,
    name: 'Stems and clean-up',
    done: 'Separate vocal, drum, bass and music tracks with little bleed, so each can be fixed or replaced on its own.',
    ask: 'How do I pull the song apart cleanly and repair what the model got wrong?',
  },
  {
    id: 'edit',
    n: 4,
    name: 'Edit and arrange',
    done: 'One take built from the best sections: the right intro, a chorus that lands, an ending that ends.',
    ask: 'How do I fix one bad section without losing the rest?',
  },
  {
    id: 'generate',
    n: 3,
    name: 'Generate and choose',
    done: 'A shortlist of takes with the right feel, picked by listening for the hook, the vocal and the low end.',
    ask: 'How many tries does it take, and how do I pick the keeper?',
  },
  {
    id: 'prompt',
    n: 2,
    name: 'Prompt and tags',
    done: 'A style description and tagged lyrics that tell the model the sound, the structure and the vocal, section by section.',
    ask: 'How do I get the sound in my head out of the model?',
  },
  {
    id: 'write',
    n: 1,
    name: 'Write',
    done: 'A reference track, a title, a hook and lyrics that sing well, before the first generation.',
    ask: 'What should exist before I press create?',
  },
];

export const LEVELS: { level: Level; name: string; note: string }[] = [
  { level: 1, name: 'Basics', note: 'First songs. Custom mode, a clear style line, tagged sections.' },
  { level: 2, name: 'Intermediate', note: 'Steering the model: vocal tags, extends, replacing sections, exclusions.' },
  { level: 3, name: 'Advanced', note: 'Leaving the app: stems, a DAW, cleanup, mixing against a reference.' },
  { level: 4, name: 'Pro', note: 'Rebuilding parts, re-recording, mastering and releasing like a label would.' },
];

export function findStage(id: string | null | undefined): Stage | undefined {
  return STAGES.find((s) => s.id === id);
}

export function stageName(id: StageId): string {
  return findStage(id)?.name ?? id;
}

export function levelName(level: Level): string {
  return LEVELS.find((l) => l.level === level)?.name ?? String(level);
}
