import '@testing-library/jest-dom';

// Polyfills pour React Router et autres APIs modernes
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;