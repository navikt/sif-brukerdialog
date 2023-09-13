function OfficeIconSvg(props: any) {
    return (
        <svg
            contentScriptType="text/ecmascript"
            width={24}
            viewBox="0 0 24 24"
            height={24}
            role="presentation"
            focusable={false}
            aria-hidden={true}
            {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 2H7v20h10V2Zm2 7V0H5v9H0v15h24V9h-5Zm0 2v11h3V11h-3ZM2 11h3v11H2V11Zm7-3V5h2v3H9Zm0 3v3h2v-3H9Zm4-3V5h2v3h-2Zm0 3v3h2v-3h-2Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default OfficeIconSvg;
