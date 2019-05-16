export const OPEN_NEW_DIALOG = '[SETTING] OPEN NEW DIALOG';
export const CLOSE_NEW_DIALOG = '[SETTING] CLOSE NEW DIALOG';

export function openNewDialog()
{
    return {
        type: OPEN_NEW_DIALOG
    }
}

export function closeNewDialog()
{
    return {
        type: CLOSE_NEW_DIALOG
    }
}

