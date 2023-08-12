let assertionEnabled = true;

/**
 * Sets whether assertions are enabled.
 * @param enabled Whether assertions are enabled.
 */
export function setGlobalAssertionEnabled(enabled: boolean): void {
	assertionEnabled = enabled;
}

/**
 * @return Whether assertions are enabled.
 */
export function getGlobalAssertionEnabled(): boolean {
	return assertionEnabled;
}
