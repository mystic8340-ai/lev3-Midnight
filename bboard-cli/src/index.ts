// This file is part of midnightntwrk/example-bboard.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import { createInterface, type Interface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { WebSocket } from 'ws';
import {
  NotesAPI,
  type NotesDerivedState,
  notesPrivateStateKey,
  type NotesProviders,
  type DeployedNotesContract,
} from '../../api/src/index';
import { ledger, type Ledger } from '../../contract/src/managed/notes/contract/index.js';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { assertIsContractAddress, toHex } from '@midnight-ntwrk/midnight-js-utils';
import { type Logger } from 'pino';

// @ts-expect-error: It's needed to enable WebSocket usage through apollo
globalThis.WebSocket = WebSocket;

export const getNotesLedgerState = async (
  providers: NotesProviders,
  contractAddress: ContractAddress,
): Promise<Ledger | null> => {
  assertIsContractAddress(contractAddress);
  const contractState = await providers.publicDataProvider.queryContractState(contractAddress);
  return contractState != null ? ledger(contractState.data) : null;
};

const DEPLOY_OR_JOIN_QUESTION = `
You can do one of the following:
  1. Deploy a new secret notes contract
  2. Join an existing secret notes contract
  3. Exit
Which would you like to do? `;

const deployOrJoin = async (providers: NotesProviders, rli: Interface, logger: Logger): Promise<NotesAPI | null> => {
  while (true) {
    const choice = await rli.question(DEPLOY_OR_JOIN_QUESTION);
    switch (choice) {
      case '1': {
        const api = await NotesAPI.deploy(providers, logger);
        logger.info(`Deployed notes contract at address: ${api.deployedContractAddress}`);
        return api;
      }
      case '2': {
        const address = await rli.question('What is the contract address (in hex)? ');
        const api = await NotesAPI.join(providers, address, logger);
        logger.info(`Joined notes contract at address: ${api.deployedContractAddress}`);
        return api;
      }
      case '3':
        logger.info('Exiting...');
        return null;
      default:
        logger.error(`Invalid choice: ${choice}`);
    }
  }
};

const displayLedgerState = async (
  providers: NotesProviders,
  deployedContract: DeployedNotesContract,
  logger: Logger,
): Promise<void> => {
  const contractAddress = deployedContract.deployTxData.public.contractAddress;
  const ledgerState = await getNotesLedgerState(providers, contractAddress);
  if (ledgerState === null) {
    logger.info(`There is no notes contract deployed at ${contractAddress}`);
  } else {
    logger.info(`Notes commitments count: ${ledgerState.notes.size()}`);
    logger.info(`Nullifiers count: ${ledgerState.nullifiers.size()}`);
  }
};

const displayPrivateState = async (providers: NotesProviders, logger: Logger): Promise<void> => {
  const privateState = await providers.privateStateProvider.get(notesPrivateStateKey);
  if (privateState === null) {
    logger.info(`There is no existing private state`);
  } else {
    logger.info(`Current secret key is: ${toHex(privateState.secretKey)}`);
  }
};

const displayDerivedState = (derivedState: NotesDerivedState | undefined, logger: Logger) => {
  if (derivedState === undefined) {
    logger.info(`No notes state currently available`);
  } else {
    logger.info(`Total decrypted notes: ${derivedState.notes.length}`);
    for (const note of derivedState.notes) {
      logger.info(`- [${note.id.substring(0, 8)}] ${note.title}: ${note.content}`);
    }
  }
};

const MAIN_LOOP_QUESTION = `
You can do one of the following:
  1. Create a note
  2. Display current ledger state (on-chain commitments)
  3. Display current private state (local secret key)
  4. Display decrypted notes
  5. Exit
Which would you like to do? `;

const logError = (logger: Logger, e: unknown) => {
  const msg = e instanceof Error ? e.message : String(e);
  logger.error(`Error: ${msg}`);
};

export const mainLoop = async (providers: NotesProviders, rli: Interface, logger: Logger): Promise<void> => {
  const notesApi = await deployOrJoin(providers, rli, logger);
  if (notesApi === null) {
    return;
  }
  let currentState: NotesDerivedState | undefined;
  const stateObserver = {
    next: (state: NotesDerivedState) => (currentState = state),
  };
  const subscription = notesApi.state$.subscribe(stateObserver);
  try {
    while (true) {
      const choice = await rli.question(MAIN_LOOP_QUESTION);
      try {
        switch (choice) {
          case '1': {
            const title = await rli.question('Enter note title: ');
            const content = await rli.question('Enter note content: ');
            await notesApi.createNote(title, content);
            logger.info('Note created successfully and commitment submitted on-chain.');
            break;
          }
          case '2':
            await displayLedgerState(providers, notesApi.deployedContract, logger);
            break;
          case '3':
            await displayPrivateState(providers, logger);
            break;
          case '4':
            displayDerivedState(currentState, logger);
            break;
          case '5':
            logger.info('Exiting...');
            return;
          default:
            logger.error(`Invalid choice: ${choice}`);
        }
      } catch (e) {
        logError(logger, e);
        logger.info('Returning to main menu...');
      }
    }
  } finally {
    subscription.unsubscribe();
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const run = async (config: any, testEnv: any, logger: Logger): Promise<void> => {
  await Promise.resolve();
  const rli = createInterface({ input, output });
  try {
    logger.info('Starting CLI session...');
  } finally {
    rli.close();
  }
};
