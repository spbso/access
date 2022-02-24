<script>
    import {
        Column,
        Content,
        Grid,
        Header, ImageLoader, Row, StructuredList, StructuredListBody, StructuredListCell, StructuredListRow,
    } from "carbon-components-svelte";
    import ValidationResult from "./components/ValidationResult.svelte";
</script>

<Header company="СПбСО" platformName="Регистрация на бал">
</Header>

<Content>
    <Grid fullWidth>
        <Row>
            <Column sm={1}>
                <ImageLoader src="stub/profile.jpeg"/>
            </Column>
            <Column>
                <Grid>
                    <Row>
                        <Column>
                            <h1>Найден Алексей Владимирович</h1>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <h2>СПО Северный Ветер</h2>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <StructuredList>
                                <StructuredListBody>
                                    <StructuredListRow>
                                        <StructuredListCell>Билет</StructuredListCell>
                                    </StructuredListRow>
                                    <StructuredListRow>
                                        <StructuredListCell>QR-код</StructuredListCell>
                                    </StructuredListRow>
                                    <StructuredListRow>
                                        <StructuredListCell>РСО</StructuredListCell>
                                    </StructuredListRow>
                                </StructuredListBody>
                            </StructuredList>
                        </Column>
                        <Column>
                            <ValidationResult ok={true} />
                        </Column>
                    </Row>
                </Grid>
            </Column>
        </Row>
    </Grid>
</Content>
